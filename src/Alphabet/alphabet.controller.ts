import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { AlphabetService } from './alphabet.service';
import { AlphabetUpdateGateway } from './alphabet.gateway';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAlphabetDto, UpdateAlphabetDto } from './dto/alphabet.dto';

@ApiTags('alphabets')
@Controller('alphabets')
export class AlphabetController {
  constructor(
    private readonly alphabetService: AlphabetService,
    private readonly alphabetUpdateGateway: AlphabetUpdateGateway,
  ) {}

  @Post()
  async create(@Body() createAlphabetDto: CreateAlphabetDto) {
    return this.alphabetService.create(
      createAlphabetDto,
      this.alphabetUpdateGateway,
    );
  }

  @Get()
  async getAllAlphabets() {
    return this.alphabetService.findAll();
  }

  @Get(':id')
  async getAlphabetById(@Param('id') id: string) {
    return await this.alphabetService.findOneById(parseInt(id, 10));
  }

  @Put(':id')
  async updateAlphabet(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlphabetDto: UpdateAlphabetDto,
  ) {
    return this.alphabetService.update(
      id,
      updateAlphabetDto,
      this.alphabetUpdateGateway,
    );
  }

  @Delete(':id')
  async deleteAlphabet(@Param('id', ParseIntPipe) id: number) {
    return this.alphabetService.delete(id, this.alphabetUpdateGateway);
  }
}
