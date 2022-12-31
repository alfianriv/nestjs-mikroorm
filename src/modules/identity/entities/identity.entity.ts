import {
  Entity,
  EntityRepositoryType,
  Filter,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '~/src/commons/base.entity';
import { IdentityRepository } from '../repository/identity.repository';
import * as bcrypt from 'bcrypt';
import { Role } from '../../role/entities/role.entity';
import { NotDeleted } from '~/src/commons/filters/not-deleted.filter';

@Entity({
  tableName: 'identities',
  customRepository: () => IdentityRepository,
})
@Filter(NotDeleted)
export class Identity extends BaseEntity {
  @Property()
  fullname: string;

  @Property({ unique: true })
  email: string;

  @Property({ hidden: true })
  password_hash: string;

  @Property({ hidden: true })
  password_salt: string;

  @Property({ hidden: true, nullable: true })
  password_hint?: string;

  @ManyToOne(() => Role, { name: 'role_id' })
  role: Role;

  [EntityRepositoryType]?: IdentityRepository;

  constructor(data: { fullname: string; email: string; password: string }) {
    super();
    this.fullname = data.fullname;
    this.email = data.email;
    this.password_salt = bcrypt.genSaltSync(10);
    this.password_hash = bcrypt.hashSync(data.password, this.password_salt);
  }
}
