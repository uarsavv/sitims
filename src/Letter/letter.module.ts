import { Module } from '@nestjs/common';
import { LetterController } from './letter.controller';
import { LetterService } from './letter.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [LetterController],
  providers: [LetterService, PrismaService],
  exports: [LetterService],
})
export class LetterModule {}
