import { Controller, Post, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
//import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
//import { AuthRegisterDto } from './dto/auth-register.dto';
import { LocalAuthGuard } from './Guard/local-auth.guard';
import { JwtAuthGuard } from './Guard/jwt-guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    schema: {
      example: {
        email: 'user@example.com',
        password: 'yourpassword',
      },
    },
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @Get('profile')
  // @UseGuards(JwtAuthGuard)
  // getProfile(@Request() req) {
  //   return req.user;
  // }
  // @ApiOkResponse({ description: 'Successfully logged in' })
  // @ApiBody({
  //   schema: {
  //     example: {
  //       email: 'user@example.com',
  //       password: 'yourpassword',
  //     },
  //   },
  // })
  // @Post('/login')
  // signIn(@Body() signInDto: AuthSignInDto) {
  //   return this.authService.login(signInDto);
  // }
  //
  // @ApiOkResponse({ description: 'Successfully registered in' })
  // @ApiBody({
  //   schema: {
  //     example: {
  //       username: 'iwa-chan',
  //       email: 'user@example.com',
  //       password: 'yourpassword',
  //     },
  //   },
  // })
  // @Post('/register')
  // register(@Body() registerDto: AuthRegisterDto) {
  //   return this.authService.register(registerDto);
  // }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'This route is protected by JWT' })
  @Get('/protected')
  getProtected() {
    return { message: 'This is a protected route' };
  }
}
