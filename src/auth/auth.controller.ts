import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/SignInDTO';
import { SignUpDTO } from './dto/SignUpDTO';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  async signIn(@Body() userData: SignInDTO) {
    return await this.authService.signIn(userData);
  }

  @Post('signUp')
  async signUp(@Body() userData: SignUpDTO) {
    return await this.authService.signUp(userData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Req() req) {
    return req.user;
  }
}
