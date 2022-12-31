import { EntityName } from '@mikro-orm/core';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseRepository<T extends object> extends EntityRepository<T> {
  constructor(em: EntityManager, entity: EntityName<T>) {
    super(em, entity);
  }

  async softDelete(id: number): Promise<void> {
    await this.em
      .getRepository(this.entityName)
      .persistAndFlush({ id, deleted_at: new Date() });
  }

  async save(data: T) {
    await this.em.getRepository(this.entityName).persistAndFlush(data);
  }
}
