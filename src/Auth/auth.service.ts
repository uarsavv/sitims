import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
//import { AuthSignInDto } from './dto/auth-sign-in.dto';
//import { AuthRegisterDto } from './dto/auth-register.dto';
//import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../User/user.service';
import * as argon2 from 'argon2';
import { IUser } from '../Types/types';

@Injectable()
export class AuthService {
  private isAuthenticated = true;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User or password is incorrect');
    }

    try {
      const passwordIsMatch = await argon2.verify(user.password, password);
      if (passwordIsMatch == true) {
        return user;
      }
    } catch (err) {
      throw new BadRequestException('Could not verify password');
    }
    throw new BadRequestException('User or password is incorrect');
  }

  async login(user: IUser) {
    const { id, email } = user;
    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: user.email }),
    };
  }
}
