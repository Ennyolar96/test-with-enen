import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { login, register, verifyEmail } from './auth.interface';
import { Transform } from 'class-transformer';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class Register implements register {
  @ApiProperty({ type: String })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  email: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password should contain at least one number, one uppercase letter, one lowercase letter, one special character, and maximum of 8 letter long',
    },
  )
  password: string;
}

export class Login
  extends PickType(Register, ['email', 'password'] as const)
  implements login {}

export class VerifiedEmail implements verifyEmail {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  token: string;
}
