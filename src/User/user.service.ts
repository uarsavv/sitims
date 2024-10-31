import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2'; // или используйте bcrypt

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(userDto: UserDto) {
    const hashedPassword = await argon2.hash(userDto.password); // Хешируем пароль
    //const token = this.jwtService.sign({ email: userDto.email });

    return this.prisma.user.create({
      data: {
        username: userDto.username,
        email: userDto.email,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOneById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('There is no such user');
    }

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
    };
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('There is no such user');
    }
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
    };
  }

  async update(id: number, userDto: UserDto) {
    const dataToUpdate: any = {
      username: userDto.username,
      email: userDto.email,
    };

    // Хешируем новый пароль, если он был предоставлен
    if (userDto.password) {
      dataToUpdate.password = await argon2.hash(userDto.password);
    }

    try {
      return this.prisma.user.update({
        data: dataToUpdate,
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error('Error in prisma update:', error);
      throw new BadRequestException('Invalid data');
    }
  }

  async delete(id: number): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: { id: id },
    });
  }
}
