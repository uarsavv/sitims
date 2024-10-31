import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateTranslationDto } from './dto/translation.dto';
import { CreateTranslationDto } from './dto/translation.dto';
@Injectable()
export class TranslationService {
  constructor(private prisma: PrismaService) {}

  async create(createTranslationDto: CreateTranslationDto) {
    return this.prisma.translation.create({
      data: {
        content: createTranslationDto.content,
        language: createTranslationDto.language,
        textId: createTranslationDto.textId,
      },
    });
  }

  async getAllTranslations() {
    return await this.prisma.translation.findMany();
  }

  async getTranslationById(id: number) {
    const translation = await this.prisma.translation.findUnique({
      where: { id },
    });

    if (!translation) {
      throw new NotFoundException(`Translation not found`);
    }

    return translation;
  }

  async updateTranslation(
    id: number,
    updateTranslationDto: UpdateTranslationDto,
  ) {
    try {
      const existingTranslation = await this.getTranslationById(id);

      if (!existingTranslation) {
        throw new NotFoundException(`Translation not found`);
      }

      return await this.prisma.translation.update({
        where: { id },
        data: {
          content: updateTranslationDto.content,
          language: updateTranslationDto.language,
          textId: updateTranslationDto.textId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to update translation');
    }
  }

  async deleteTranslation(id: number) {
    const translation = await this.getTranslationById(id);

    if (!translation) {
      throw new NotFoundException(`Translation with not found`);
    }

    await this.prisma.translation.delete({
      where: { id },
    });

    return { message: 'Translation has been deleted' };
  }
}
