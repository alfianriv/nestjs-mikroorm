import { ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Identity } from '../modules/identity/entities/identity.entity';

export abstract class BaseEntity {
  @PrimaryKey({ type: 'number' })
  id: number;

  @Property({ default: true })
  status: boolean;

  @Property()
  created_at: Date = new Date();

  @Property({ nullable: true, onUpdate: () => new Date() })
  updated_at: Date = new Date();

  @Property({ nullable: true })
  deleted_at?: Date;

  @ManyToOne(() => Identity, { nullable: true, name: 'created_by_id' })
  created_by?: Identity;

  @ManyToOne(() => Identity, { nullable: true, name: 'updated_by_id' })
  updated_by?: Identity;

  @ManyToOne(() => Identity, { nullable: true, name: 'deleted_by_id' })
  deleted_by?: Identity;
}
