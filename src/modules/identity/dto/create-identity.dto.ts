import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateIdentityDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  fullname: string;

  @ApiProperty({ type: 'string' })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsInt()
  role_id: number;
}
