import { Module } from '@nestjs/common';
import { AlphabetController } from './alphabet.controller';
import { AlphabetService } from './alphabet.service';
import { PrismaService } from '../prisma.service';
import { AlphabetUpdateGateway } from './alphabet.gateway';

@Module({
  controllers: [AlphabetController],
  providers: [AlphabetService, PrismaService, AlphabetUpdateGateway],
  exports: [AlphabetService],
})
export class AlphabetModule {}
