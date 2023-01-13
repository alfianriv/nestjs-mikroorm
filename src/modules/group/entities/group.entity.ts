import {
  Collection,
  Entity,
  EntityRepositoryType,
  Filter,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '~/src/commons/base.entity';
import { NotDeleted } from '~/src/commons/filters/not-deleted.filter';
import { Role } from '../../role/entities/role.entity';
import { GroupRepository } from '../repository/group.repository';

@Entity({ tableName: 'groups', customRepository: () => GroupRepository })
@Filter(NotDeleted)
export class Group extends BaseEntity {
  @Property()
  name: string;

  @Property()
  display_name: string;

  @OneToMany(() => Role, (role) => role.group)
  roles = new Collection<Role>(this);

  [EntityRepositoryType]?: GroupRepository;

  constructor(data: { name: string; display_name: string }) {
    super();
    this.name = data.name;
    this.display_name = data.display_name;
  }
}
