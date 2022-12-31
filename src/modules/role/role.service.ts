import { wrap } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repository/role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly repository: RoleRepository) {}

  async create(data: CreateRoleDto) {
    const item = new Role({ ...data });
    const saved = await this.repository.create(item);
    await this.repository.persistAndFlush(saved);

    return {
      data: saved,
    };
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const item = await this.findOneById(id);
    return {
      data: item,
    };
  }

  async findOneById(id: number) {
    const item = await this.repository.findOne({ id });
    if (!item) {
      throw new NotFoundException('Role not found');
    }
    return item;
  }

  async update(id: number, data: UpdateRoleDto) {
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
