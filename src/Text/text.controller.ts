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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiBody,
} from '@nestjs/swagger';
import { TextService } from './text.service';
import { CreateTextDto, UpdateTextDto } from './dto/text.dto';
import { EmptyFieldsException } from '../Exception/empty-fields.exception';

@ApiTags('texts')
@Controller('texts')
export class TextController {
  constructor(private readonly textService: TextService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new text' })
  @ApiOkResponse({ status: 201, description: 'Text created successfully' })
  @ApiBadRequestResponse({ status: 401, description: 'Bad request' })
  @ApiBody({
    schema: {
      example: {
        content: 'тылбаасчыт',
        language: 'ykt',
        translation: 'переводчик',
        userId: '1',
      },
    },
  })
  async createText(@Body() createTextDto: CreateTextDto) {
    const missingFields = this.getMissingFields(createTextDto, [
      'content',
      'language',
      'translation',
      'userId',
    ]);
    if (missingFields.length > 0) {
      throw new EmptyFieldsException(missingFields);
    }

    return await this.textService.create(createTextDto);
  }

  private getMissingFields(dto: any, requiredFields: string[]): string[] {
    return requiredFields.filter(
      (field) => !dto[field] || dto[field].trim() === '',
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all texts' })
  @ApiOkResponse({ status: 200, description: 'Texts retrieved successfully' })
  @ApiBadRequestResponse({ status: 401, description: 'Bad request' })
  async getAllTexts() {
    return await this.textService.getAllTexts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get text by ID' })
  @ApiOkResponse({ status: 200, description: 'Text retrieved successfully.' })
  @ApiBadRequestResponse({ status: 401, description: 'Bad request' })
  async getTextById(@Param('id', ParseIntPipe) id: number) {
    const text = await this.textService.getTextById(id);
    if (!text) {
      throw new NotFoundException(`Text not found`);
    }
    return text;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update text by ID' })
  @ApiOkResponse({ status: 200, description: 'Text updated successfully.' })
  @ApiNoContentResponse({ status: 404, description: 'Text not found.' })
  @ApiBody({
    schema: {
      example: {
        content: 'тылбаасчыт',
        language: 'ykt',
        translation: 'переводчик',
        userId: '1',
      },
    },
  })
  async updateText(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTextDto: UpdateTextDto,
  ) {
    const missingFields = this.getMissingFields(updateTextDto, [
      'content',
      'language',
      'translation',
      'userId',
    ]);
    if (missingFields.length > 0) {
      throw new EmptyFieldsException(missingFields);
    }
    return await this.textService.updateText(id, updateTextDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete text by ID' })
  @ApiOkResponse({ status: 200, description: 'Text deleted successfully.' })
  @ApiBadRequestResponse({ status: 401, description: 'Bad request' })
  async deleteText(@Param('id', ParseIntPipe) id: number) {
    return await this.textService.deleteText(id);
  }
}
