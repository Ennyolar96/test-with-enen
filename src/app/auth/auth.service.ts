import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from 'src/global/database';
import { MailService, template } from 'src/global/services';
import { decrypted, encryption } from 'src/helper';
import { Authentication, login, register, verifyEmail } from './entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async signup(create: register): Promise<Authentication> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: create.email },
      });
      if (user) {
        if (!user.verified) {
          await this.sendEmail(user.email);
          throw new ForbiddenException({
            message: 'Account not verified, new email sent',
            success: false,
          });
        }
        throw new BadRequestException({
          message: 'User already exist with this email',
          success: false,
        });
      }
      const password = await argon.hash(create.password);
      const expiredAt = new Date(Date.now() + 10 * 60 * 1000);
      const code = await encryption(
        this.generateRandomCode(10),
        this.config.getOrThrow('ENCRYPTION'),
      );

      const data = {
        ...create,
        password,
        expiredAt,
        verified: false,
        code,
      };
      return this.prismaService.user.create({ data }).then(async (data) => {
        delete data.password;
        const token = await encryption(
          JSON.stringify({ code, email: data.email }),
          this.config.getOrThrow('ENCRYPTION'),
        );
        await this.mailService.sendMail(
          data.email,
          template.welcome,
          'Welcome! Please Verify Your Account',
          {
            fullname: data.fullName,
            token,
          },
        );
        return data;
      });
    } catch (error) {
      throw error;
    }
  }

  async signin(data: login) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        throw new ForbiddenException({
          message: 'Invalid credential',
          success: false,
        });
      }
      if (!user.verified) {
        await this.sendEmail(user.email);
        throw new BadRequestException({
          message: 'Email not yet verified',
          success: false,
        });
      }
      const isMatch = await argon.verify(user.password, data.password);
      if (!isMatch) {
        throw new ForbiddenException({
          message: 'Incorrect password',
          success: false,
        });
      }
      delete user.password;
      const token = await this.authorize(user.id, user.email);
      return { ...user, token };
    } catch (error) {
      throw error;
    }
  }

  async verified(query: verifyEmail): Promise<Authentication> {
    try {
      const decryptToken = await decrypted(
        query.token,
        this.config.getOrThrow('ENCRYPTION'),
      );

      if (!decryptToken || typeof decryptToken !== 'string') {
        throw new BadRequestException('Invalid or missing token');
      }

      const parse: { code: string; email: string } =
        await JSON.parse(decryptToken);

      const user = await this.prismaService.user.findFirst({
        where: {
          email: parse.email,
          code: parse.code,
          expiredAt: {
            gt: new Date(),
          },
        },
      });

      if (!user) {
        await this.sendEmail(parse.email);
        throw new ForbiddenException({
          message:
            'token expired or user not found. new token sent to the user successfully',
          success: false,
        });
      }

      // const [verified, user_code] = await Promise.all([
      //   decrypted(user.code, this.config.getOrThrow('ENCRYPTION')),
      //   decrypted(parse.code, this.config.getOrThrow('ENCRYPTION')),
      // ]);

      // if (verified !== user_code) {
      //   await this.sendEmail(parse.email);
      //   throw new ForbiddenException({
      //     message: 'Incorrect token or expired token. new token sent success',
      //     success: false,
      //   });
      // }

      const updatedUser = await this.prismaService.user.update({
        where: { email: parse.email },
        data: { verified: true },
      });
      delete updatedUser.password;
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  private async sendEmail(email: string) {
    const expiredAt = new Date(Date.now() + 10 * 60 * 1000);
    const code = await encryption(
      this.generateRandomCode(10),
      this.config.getOrThrow('ENCRYPTION'),
    );

    const token = await encryption(
      JSON.stringify({ code, email }),
      this.config.getOrThrow('ENCRYPTION'),
    );

    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) return;

    await Promise.all([
      this.prismaService.user.update({
        where: { email },
        data: { code, expiredAt },
      }),
      this.mailService.sendMail(
        email,
        template.resend,
        'Verify Your Account – Action Needed',
        {
          fullname: user.fullName,
          token,
        },
      ),
    ]);
    return;
  }

  private authorize(userId: string | number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(payload);
  }

  private generateRandomCode(length: number): string {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
}
