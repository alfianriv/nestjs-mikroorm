import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateIdentityDto } from './create-identity.dto';

export class UpdateIdentityDto extends PartialType(CreateIdentityDto) {
  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  fullname: string;

  @ApiProperty({ type: 'string', required: false })
  @IsEmail()
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  @IsOptional()
  password: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsInt()
  @IsOptional()
  role_id: number;
}
