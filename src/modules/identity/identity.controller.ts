import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { IdentityService } from './identity.service';
import { CreateIdentityDto } from './dto/create-identity.dto';
import { UpdateIdentityDto } from './dto/update-identity.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('identities')
@Controller('identities')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post()
  create(@Body() data: CreateIdentityDto) {
    return this.identityService.create(data);
  }

  @Get()
  findAll() {
    return this.identityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.identityService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateIdentityDto,
  ) {
    return this.identityService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.identityService.remove(id);
  }
}
