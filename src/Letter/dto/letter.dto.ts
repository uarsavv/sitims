import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateLetterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The original letter from the source alphabet',
    type: String,
  })
  original: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The converted letter for the target alphabet',
    type: String,
  })
  converted: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the alphabet to which the letter belongs',
    type: Number,
  })
  alphabetId: number;

  constructor(original: string, converted: string, alphabetId: number) {
    this.original = original;
    this.converted = converted;
    this.alphabetId = alphabetId;
  }
}

export class UpdateLetterDto {
  @IsString()
  @ApiProperty({
    description: 'Original letter from the source alphabet',
    type: String,
    required: false,
  })
  original: string;

  @IsString()
  @ApiProperty({
    description: 'Converted letter for the target alphabet',
    type: String,
    required: false,
  })
  converted: string;

  @IsInt()
  @ApiProperty({
    description: 'The ID of the alphabet to which the letter belongs',
    type: Number,
    required: false,
  })
  alphabetId: number;

  constructor(original: string, converted: string, alphabetId: number) {
    this.original = original;
    this.converted = converted;
    this.alphabetId = alphabetId;
  }
}
