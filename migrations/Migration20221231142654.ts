import { Migration } from '@mikro-orm/migrations';

export class Migration20221231142654 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "groups" ("id" serial primary key, "status" boolean not null default true, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "created_by_id" int null, "updated_by_id" int null, "deleted_by_id" int null, "name" varchar(255) not null, "display_name" varchar(255) not null);',
    );

    this.addSql(
      'alter table "groups" add constraint "groups_created_by_id_foreign" foreign key ("created_by_id") references "identities" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "groups" add constraint "groups_updated_by_id_foreign" foreign key ("updated_by_id") references "identities" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "groups" add constraint "groups_deleted_by_id_foreign" foreign key ("deleted_by_id") references "identities" ("id") on update cascade on delete set null;',
    );

    this.addSql('alter table "roles" add column "group_id" int null;');
    this.addSql(
      'alter table "roles" add constraint "roles_group_id_foreign" foreign key ("group_id") references "groups" ("id") on update cascade on delete set null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "roles" drop constraint "roles_group_id_foreign";',
    );

    this.addSql('drop table if exists "groups" cascade;');

    this.addSql('alter table "roles" drop column "group_id";');
  }
}
