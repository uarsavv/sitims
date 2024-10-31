import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTextDto, UpdateTextDto } from './dto/text.dto';

@Injectable()
export class TextService {
  constructor(private prisma: PrismaService) {}

  async create(createTextDto: CreateTextDto) {
    try {
      return await this.prisma.text.create({
        data: {
          content: createTextDto.content,
          language: createTextDto.language,
          userId: createTextDto.userId,
        },
      });
    } catch (error) {
      throw new NotFoundException('Failed to create text');
    }
  }

  async getAllTexts() {
    return await this.prisma.text.findMany();
  }

  async getTextById(id: number) {
    const text = await this.prisma.text.findUnique({
      where: { id },
      include: {
        translations: true,
      },
    });

    if (!text) {
      throw new NotFoundException(`Text with ID ${id} not found`);
    }

    return text;
  }

  async updateText(id: number, updateTextDto: UpdateTextDto) {
    try {
      const existingText = await this.getTextById(id);

      if (!existingText) {
        throw new NotFoundException(`Text with ID ${id} not found`);
      }

      return await this.prisma.text.update({
        where: { id },
        data: {
          content: updateTextDto.content,
          language: updateTextDto.language,
          userId: updateTextDto.userId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Failed to update text');
    }
  }

  async deleteText(id: number) {
    const text = await this.getTextById(id);

    if (!text) {
      throw new NotFoundException('Text not found');
    }

    await this.prisma.text.delete({
      where: { id },
    });

    return { message: 'Text has been deleted' };
  }
}
