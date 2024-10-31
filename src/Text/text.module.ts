import { Module } from '@nestjs/common';
import { TextController } from './text.controller';
import { TextService } from './text.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TextController],
  providers: [TextService, PrismaService],
  exports: [TextService],
})
export class TextModule {}
