import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateTextDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Content of the text to be translated',
    type: String,
  })
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The language of the text',
    type: String,
  })
  language: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the user who owns the text',
    type: Number,
  })
  userId: number;

  constructor(content: string, language: string, userId: number) {
    this.content = content;
    this.language = language;
    this.userId = userId;
  }
}

export class UpdateTextDto {
  @IsString()
  @ApiProperty({
    description: 'The content of the text to be translated',
    type: String,
    required: false,
  })
  content?: string;

  @IsString()
  @ApiProperty({
    description: 'The language of the text',
    type: String,
    required: false,
  })
  language: string;

  @IsInt()
  @ApiProperty({
    description: 'The ID of the user who owns the text',
    type: Number,
    required: false,
  })
  userId: number;

  constructor(content: string, language: string, userId: number) {
    this.content = content;
    this.language = language;
    this.userId = userId;
  }
}
