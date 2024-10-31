import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../User/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './Guard/jwt.strategy';
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, LocalStrategy],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
})
export class AuthModule {}
