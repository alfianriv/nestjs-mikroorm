import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIdentityDto } from './dto/create-identity.dto';
import { UpdateIdentityDto } from './dto/update-identity.dto';
import { IdentityRepository } from './repository/identity.repository';
import * as bcrypt from 'bcrypt';
import { Identity } from './entities/identity.entity';
import { wrap } from '@mikro-orm/core';
import { RoleService } from '../role/role.service';

@Injectable()
export class IdentityService {
  constructor(
    private readonly repository: IdentityRepository,
    private readonly roleService: RoleService,
  ) {}

  async create(data: CreateIdentityDto) {
    const role = await this.roleService.findOneById(data.role_id);
    const item = new Identity({ ...data });
    item.role = role;
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
    return {
      data: item,
    };
  }

  async update(id: number, data: UpdateIdentityDto) {
    const item = await this.findOneById(id);
    if (data.role_id) {
      const role = await this.roleService.findOneById(data.role_id);
      item.role = role;
    }
    if (data.password) {
      const { hash } = this.hashPassword(data.password, item.password_salt);
      item.password_hash = hash;
    }
    wrap(item).assign(data);
    await this.repository.flush();

    return item;
  }

  async remove(id: number) {
    const item = await this.findOneById(id);
    await this.repository.softDelete(item);
  }

  hashPassword(password: string, salt: string = null) {
    if (!salt) {
      salt = bcrypt.genSaltSync(10);
    }
    const hash = bcrypt.hashSync(password, salt);
    return {
      salt,
      hash,
    };
  }

  async findOneById(id: number): Promise<Identity> {
    const item = await this.repository.findOne({ id });
    if (!item) {
      throw new NotFoundException('Identity not found');
    }
    return item;
  }
}
