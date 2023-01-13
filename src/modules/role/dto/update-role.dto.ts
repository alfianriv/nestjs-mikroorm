import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  display_name?: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsInt()
  @IsOptional()
  group_id?: number;
}
