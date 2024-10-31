import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';
import { TranslationService } from './translation.service';
import {
  CreateTranslationDto,
  UpdateTranslationDto,
} from './dto/translation.dto';
import { EmptyFieldsException } from '../Exception/empty-fields.exception';

@ApiTags('translations')
@Controller('translations')
export class TranslationController {
  private readonly translationService: TranslationService;
  constructor(translationService: TranslationService) {
    this.translationService = translationService;
  }

  @ApiOperation({ summary: 'Create a new translation' })
  @ApiOkResponse({
    status: 201,
    description: 'Translation created successfully',
  })
  @ApiBadRequestResponse({ status: 404, description: 'Invalid input data' })
  @ApiBody({
    schema: {
      example: {
        content: 'тылбаасчыт',
        language: 'ykt',
        textId: '1',
      },
    },
  })
  @Post()
  async createTranslation(@Body() createTranslationDto: CreateTranslationDto) {
    const missingFields = this.getMissingFields(createTranslationDto, [
      'content',
      'language',
      'textId',
      'text',
    ]);
    if (missingFields.length > 0) {
      throw new EmptyFieldsException(missingFields);
    }
    try {
      return await this.translationService.create(createTranslationDto);
    } catch (error) {
      throw new BadRequestException('Failed to create translation');
    }
  }
  private getMissingFields(dto: any, requiredFields: string[]): string[] {
    return requiredFields.filter(
      (field) => !dto[field] || dto[field].trim() === '',
    );
  }

  @ApiOperation({ summary: 'Get all translations' })
  @ApiOkResponse({
    status: 201,
    description: 'Translations retrieved successfully.',
  })
  @Get()
  async getAllTranslations() {
    return await this.translationService.getAllTranslations();
  }

  @ApiOperation({ summary: 'Get translation by ID' })
  @ApiOkResponse({
    status: 201,
    description: 'Translation retrieved successfully.',
  })
  @ApiBadRequestResponse({ status: 404, description: 'Translation not found.' })
  @Get(':id')
  async getTranslationById(@Param('id', ParseIntPipe) id: number) {
    const translation = await this.translationService.getTranslationById(id);
    if (!translation) {
      throw new NotFoundException(`Translation not found`);
    }
    return translation;
  }

  @ApiOperation({ summary: 'Update translation by ID' })
  @ApiOkResponse({
    status: 200,
    description: 'Translation updated successfully.',
  })
  @ApiOkResponse({ status: 400, description: 'Invalid input data.' })
  @ApiBadRequestResponse({ status: 404, description: 'Translation not found.' })
  @ApiBody({
    schema: {
      example: {
        content: 'тылбаасчыт',
        language: 'ykt',
        textId: '1',
      },
    },
  })
  @Put(':id')
  async updateTranslation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTranslationDto: UpdateTranslationDto,
  ) {
    const missingFields = this.getMissingFields(updateTranslationDto, [
      'content',
      'language',
      'textId',
    ]);
    if (missingFields.length > 0) {
      throw new EmptyFieldsException(missingFields);
    }
    try {
      return await this.translationService.updateTranslation(
        id,
        updateTranslationDto,
      );
    } catch (error) {
      throw new BadRequestException('Failed to update translation');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete translation by ID' })
  @ApiOkResponse({
    status: 200,
    description: 'Translation deleted successfully.',
  })
  @ApiBadRequestResponse({ status: 404, description: 'Translation not found.' })
  async deleteTranslation(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.translationService.deleteTranslation(id);
    } catch (error) {
      throw new BadRequestException('Failed to delete translation');
    }
  }
}
