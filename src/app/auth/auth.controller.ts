import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, Register, VerifiedEmail } from './entities';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'auth',
  version: VERSION_NEUTRAL,
})
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up with your credential' })
  @ApiBody({ type: Register })
  @Post('signup')
  create(@Body() body: Register) {
    return this.authService.signup(body);
  }

  @ApiOperation({ summary: 'Sign in with your valid credential' })
  @ApiBody({ type: Login })
  @Post('signin')
  login(@Body() body: Login) {
    return this.authService.signin(body);
  }

  @ApiOperation({ summary: 'Verify your email' })
  @ApiParam({ type: VerifiedEmail, required: true, name: 'token' })
  @Get('verify/:token')
  verified(@Param() param: VerifiedEmail) {
    return this.authService.verified(param);
  }
}
