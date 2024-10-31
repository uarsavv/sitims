import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional } from 'class-validator';

export class CreateAlphabetDto {
  @ApiProperty({
    description: 'The name of the alphabet',
    example: 'Yakut',
  })
  @IsString()
  @Length(1, 100)
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class UpdateAlphabetDto {
  @ApiProperty({
    description: 'The name of the alphabet',
    example: 'Sakha',
    required: false,
  })
  @IsString()
  @Length(1, 100)
  @IsOptional()
  name: string;

  constructor(name: string) {
    if (name) {
      this.name = name;
    }
  }
}
