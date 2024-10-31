import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAlphabetDto } from './dto/alphabet.dto';
import { UpdateAlphabetDto } from './dto/alphabet.dto';
import { AlphabetUpdateGateway } from './alphabet.gateway';

@Injectable()
export class AlphabetService {
  constructor(private prisma: PrismaService) {}

  async create(
    createAlphabetDto: CreateAlphabetDto,
    alphabetUpdateGateway: AlphabetUpdateGateway,
  ) {
    try {
      const newAlphabet = await this.prisma.alphabet.create({
        data: {
          name: createAlphabetDto.name,
        },
      });
      alphabetUpdateGateway.sendAlphabetUpdate(newAlphabet);
      return newAlphabet;
    } catch (error) {
      throw new BadRequestException('Invalid data');
    }
  }

  async findAll() {
    return await this.prisma.alphabet.findMany();
  }

  async findOneById(id: number) {
    const alphabet = await this.prisma.alphabet.findUnique({
      where: { id: id },
    });
    if (!alphabet) {
      throw new NotFoundException('Alphabet not found');
    }
    return alphabet;
  }

  async update(
    id: number,
    updateAlphabetDto: UpdateAlphabetDto,
    alphabetUpdateGateway: AlphabetUpdateGateway,
  ) {
    const updatedAlphabet = await this.prisma.alphabet.update({
      where: { id: id },
      data: {
        name: updateAlphabetDto.name,
      },
    });
    try {
      alphabetUpdateGateway.sendAlphabetUpdate(updatedAlphabet);
      return updatedAlphabet;
    } catch (error) {
      throw new BadRequestException('Invalid data');
    }
  }

  async delete(
    id: number,
    alphabetUpdateGateway: AlphabetUpdateGateway,
  ): Promise<void> {
    try {
      const alphabet = await this.prisma.alphabet.findUnique({
        where: { id: id },
      });
      if (!alphabet) {
        throw new NotFoundException('Alphabet not found');
      }
      await this.prisma.alphabet.delete({
        where: { id: id },
      });
      alphabetUpdateGateway.sendAlphabetUpdate(alphabet);
    } catch (error) {
      throw new BadRequestException('Unable to delete alphabet');
    }
  }
}
