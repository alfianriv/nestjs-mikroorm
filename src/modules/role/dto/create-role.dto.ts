import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  display_name: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsInt()
  group_id: number;
}
