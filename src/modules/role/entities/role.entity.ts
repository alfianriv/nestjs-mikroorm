import {
  Entity,
  EntityRepositoryType,
  Filter,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '~/src/commons/base.entity';
import { NotDeleted } from '~/src/commons/filters/not-deleted.filter';
import { Group } from '../../group/entities/group.entity';
import { RoleRepository } from '../repository/role.repository';

@Entity({ tableName: 'roles', customRepository: () => RoleRepository })
@Filter(NotDeleted)
export class Role extends BaseEntity {
  @Property()
  name: string;

  @Property()
  display_name: string;

  @ManyToOne(() => Group, { name: 'group_id', nullable: true })
  group?: Group;

  [EntityRepositoryType]?: RoleRepository;

  constructor(data: { name: string; display_name: string }) {
    super();
    this.name = data.name;
    this.display_name = data.display_name;
  }
}
