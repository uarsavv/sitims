import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateTranslationDto {
  @IsString()
  @IsNotEmpty({ message: 'Content should not be empty' })
  @ApiProperty({
    description: 'The content of the translation',
    type: String,
  })
  content: string;

  @IsString()
  @IsNotEmpty({ message: 'Language should not be empty' })
  @ApiProperty({
    description: 'The language of the translation',
    type: String,
  })
  language: string;

  @IsInt()
  @IsNotEmpty({ message: 'Text ID should not be empty' })
  @ApiProperty({
    description: 'The ID of the original text being translated',
    type: Number,
  })
  textId: number;

  constructor(content: string, language: string, textId: number) {
    this.content = content;
    this.language = language;
    this.textId = textId;
  }
}

export class UpdateTranslationDto {
  @IsString()
  @ApiProperty({
    description: 'The content of the translation',
    type: String,
    required: false,
  })
  content: string;

  @IsString()
  @ApiProperty({
    description: 'The language of the translation',
    type: String,
    required: false,
  })
  language: string;

  @IsInt()
  @ApiProperty({
    description: 'The ID of the original text being translated',
    type: Number,
    required: false,
  })
  textId: number;

  constructor(content: string, language: string, textId: number) {
    this.content = content;
    this.language = language;
    this.textId = textId;
  }
}
