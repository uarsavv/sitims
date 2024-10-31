import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
})
export class UserModule {}
