import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLetterDto } from './dto/letter.dto';
import { UpdateLetterDto } from './dto/letter.dto';

@Injectable()
export class LetterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLetterDto: CreateLetterDto) {
    const alphabet = await this.prisma.alphabet.findUnique({
      where: { id: createLetterDto.alphabetId },
    });

    if (!alphabet) {
      throw new BadRequestException('Invalid alphabetId');
    }

    return await this.prisma.letter.create({
      data: {
        original: createLetterDto.original,
        converted: createLetterDto.converted,
        alphabetId: createLetterDto.alphabetId,
      },
    });
  }

  async getAllLetters() {
    return await this.prisma.letter.findMany();
  }

  async getLetterById(id: number) {
    const letter = await this.prisma.letter.findUnique({
      where: { id },
    });
    return letter;
  }

  async updateLetter(id: number, updateLetterDto: UpdateLetterDto) {
    try {
      const existingLetter = await this.getLetterById(id);

      if (!existingLetter) {
        throw new NotFoundException(`Letter with ID ${id} not found`);
      }

      return await this.prisma.letter.update({
        where: { id },
        data: {
          original: updateLetterDto.original,
          converted: updateLetterDto.converted,
          alphabetId: updateLetterDto.alphabetId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to update letter');
    }
  }

  async deleteLetter(id: number) {
    const letter = await this.getLetterById(id);

    if (!letter) {
      throw new NotFoundException(`Letter not found`);
    }

    await this.prisma.letter.delete({
      where: { id },
    });

    return { message: 'Letter has been deleted' };
  }
}
