import { wrap } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupRepository } from './repository/group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly repository: GroupRepository) {}

  async create(data: CreateGroupDto) {
    const item = new Group({ ...data });
    const saved = await this.repository.create(item);
    await this.repository.persistAndFlush(saved);

    return {
      data: saved,
    };
  }

  findAll() {
    return this.repository.find({});
  }

  async findOne(id: number) {
    const item = await this.findOneById(id);
    return { data: item };
  }

  async findOneById(id: number) {
    const item = await this.repository.findOne({ id });
    if (!item) {
      throw new NotFoundException('Group not found');
    }
    return item;
  }

  async update(id: number, data: UpdateGroupDto) {
    const item = await this.findOneById(id);
    wrap(item).assign(data);
    await this.repository.flush();
    return {
      data: item,
    };
  }

  async remove(id: number) {
    await this.findOneById(id);
    await this.repository.softDelete(id);
  }
}
