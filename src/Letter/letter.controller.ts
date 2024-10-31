import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { LetterService } from './letter.service';
import { CreateLetterDto, UpdateLetterDto } from './dto/letter.dto';
import { EmptyFieldsException } from '../Exception/empty-fields.exception';

@ApiTags('letters')
@Controller('letters')
export class LetterController {
  constructor(private readonly letterService: LetterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new letter' })
  @ApiOkResponse({
    status: 201,
    description: 'Letter created successfully.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid input data.' })
  async createLetter(@Body() createLetterDto: CreateLetterDto) {
    const missingFields = this.getMissingFields(createLetterDto, [
      'original',
      'converted',
      'alphabetId',
    ]);
    if (missingFields.length > 0) {
      throw new EmptyFieldsException(missingFields);
    }
    try {
      return await this.letterService.create(createLetterDto);
    } catch (error) {
      throw new BadRequestException('Failed to create letter');
    }
  }

  private getMissingFields(dto: any, requiredFields: string[]): string[] {
    return requiredFields.filter(
      (field) => !dto[field] || dto[field].trim() === '',
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all letters' })
  @ApiOkResponse({
    status: 200,
    description: 'Letters retrieved successfully.',
  })
  async getAllLetters() {
    return await this.letterService.getAllLetters();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get letter by ID' })
  @ApiOkResponse({
    status: 200,
    description: 'Letter retrieved successfully.',
  })
  @ApiBadRequestResponse({ status: 404, description: 'Letter not found.' })
  async getLetterById(@Param('id', ParseIntPipe) id: number) {
    const letter = await this.letterService.getLetterById(id);
    if (!letter) {
      throw new BadRequestException(`Letter not found`);
    }
    return letter;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update letter by ID' })
  @ApiOkResponse({
    status: 200,
    description: 'Letter updated successfully.',
  })
  @ApiBadRequestResponse({ status: 400, description: 'Invalid input data.' })
  async updateLetter(
    @Param('id') id: number,
    @Body() updateLetterDto: UpdateLetterDto,
  ) {
    const missingFields = this.getMissingFields(updateLetterDto, [
      'original',
      'converted',
      'alphabetId',
    ]);
    if (missingFields.length > 0) {
      throw new EmptyFieldsException(missingFields);
    }
    try {
      return await this.letterService.updateLetter(id, updateLetterDto);
    } catch (error) {
      throw new BadRequestException('Failed to update letter');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete letter by ID' })
  @ApiOkResponse({
    status: 200,
    description: 'Letter deleted successfully.',
  })
  @ApiBadRequestResponse({ status: 404, description: 'Letter not found.' })
  async deleteLetter(@Param('id') id: number) {
    try {
      return await this.letterService.deleteLetter(id);
    } catch (error) {
      throw new BadRequestException('Failed to delete letter');
    }
  }
}
