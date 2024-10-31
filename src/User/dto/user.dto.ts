import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  @ApiProperty({
    description: 'name',
    type: String,
  })
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsString()
  @ApiProperty({
    description: 'email',
    type: String,
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'password',
    type: String,
  })
  password: string;

  @ApiProperty({
    description: 'registration_date',
    type: Date,
  })
  registration_date: Date;

  constructor(name: string, email: string, password: string) {
    this.email = email;
    this.username = name;
    this.password = password;
    this.registration_date = new Date();
  }
}
