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
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
//import { User } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserDto } from './dto/user.dto';
import { EmptyFieldsExceptionFilter } from '../Exception/empty-fields.filter';
import { EmptyFieldsException } from '../Exception/empty-fields.exception';

@ApiTags('users')
@Controller('users')
@UseFilters(EmptyFieldsExceptionFilter)
export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @ApiOperation({ summary: 'Create new User' })
  @ApiOkResponse({
    status: 201,
    description: 'Successfully сreated',
    type: UserDto,
  })
  @ApiBadRequestResponse({ status: 404, description: 'Bad Request' })
  @ApiBody({
    schema: {
      example: {
        username: 'iwa-chan',
        email: 'user@example.com',
        password: 'yourpassword',
      },
    },
  })
  @Post()
  async create(@Body() userDto: UserDto) {
    const missingFields = this.getMissingFields(userDto, [
      'username',
      'email',
      'password',
    ]);
    if (missingFields.length > 0) {
      throw new EmptyFieldsException(missingFields);
    }

    return this.userService.create(userDto);
  }

  private getMissingFields(dto: any, requiredFields: string[]): string[] {
    return requiredFields.filter(
      (field) => !dto[field] || dto[field].trim() === '',
    );
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    status: 201,
    description: 'List of all users',
    type: [UserDto],
  })
  @ApiBadRequestResponse({ status: 404, description: 'All users not found' })
  @Get()
  async getAllUsers() {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw new NotFoundException('Unable to get all users');
    }
  }

  @ApiOperation({ summary: 'Get a user by id' })
  @ApiOkResponse({
    status: 201,
    description: 'User found by id',
    type: UserDto,
  })
  @ApiBadRequestResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.userService.findOneById(id);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @ApiOperation({ summary: 'Get a user by email' })
  @ApiOkResponse({
    status: 200, // Измените статус на 200
    description: 'User found by email',
    type: UserDto,
  })
  @ApiBadRequestResponse({ status: 404, description: 'User not found' })
  @Get('email/:email') // Измените путь
  async getUserByEmail(@Param('email') email: string) {
    try {
      return await this.userService.findOneByEmail(email); // Используйте await
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiOkResponse({
    status: 200,
    description: 'User successfully updated',
    type: UserDto,
  })
  @ApiBadRequestResponse({ status: 404, description: 'User not updated' })
  @ApiBody({
    schema: {
      example: {
        username: 'iwa-chan',
        email: 'user@example.com',
        password: 'yourpassword',
      },
    },
  })
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UserDto: UserDto,
  ) {
    const missingFields = this.getMissingFields(UserDto, [
      'username',
      'email',
      'password',
    ]);
    if (missingFields.length > 0) {
      throw new EmptyFieldsException(missingFields);
    }
    try {
      return this.userService.update(id, UserDto);
    } catch (error) {
      throw new NotFoundException('User not updated');
    }
  }

  @ApiOperation({ summary: 'Delete User by id' })
  @ApiOkResponse({
    status: 201,
    description: 'Successfully delete',
    type: UserDto,
  })
  @ApiBadRequestResponse({ status: 404, description: 'Bad Request' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.delete(id);
  }
}
