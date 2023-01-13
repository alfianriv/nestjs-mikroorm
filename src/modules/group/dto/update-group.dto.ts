import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateGroupDto } from './create-group.dto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsOptional()
  display_name?: string;
}
