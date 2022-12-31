import {
  Entity,
  EntityRepositoryType,
  Filter,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '~/src/commons/base.entity';
import { NotDeleted } from '~/src/commons/filters/not-deleted.filter';
import { RoleRepository } from '../repository/role.repository';

@Entity({ tableName: 'roles', customRepository: () => RoleRepository })
@Filter(NotDeleted)
export class Role extends BaseEntity {
  @Property()
  name: string;

  @Property()
  display_name: string;

  [EntityRepositoryType]?: RoleRepository;

  constructor(data: { name: string; display_name: string }) {
    super();
    this.name = data.name;
    this.display_name = data.display_name;
  }
}
