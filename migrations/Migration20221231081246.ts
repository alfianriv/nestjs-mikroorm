import { Migration } from '@mikro-orm/migrations';

export class Migration20221231081246 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "roles" ("id" serial primary key, "status" boolean not null default true, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "created_by_id" int null, "updated_by_id" int null, "deleted_by_id" int null, "name" varchar(255) not null, "display_name" varchar(255) not null);',
    );

    this.addSql(
      'create table "identities" ("id" serial primary key, "status" boolean not null default true, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "created_by_id" int null, "updated_by_id" int null, "deleted_by_id" int null, "fullname" varchar(255) not null, "email" varchar(255) not null, "password_hash" varchar(255) not null, "password_salt" varchar(255) not null, "password_hint" varchar(255) null, "role_id" int not null);',
    );
    this.addSql(
      'alter table "identities" add constraint "identities_email_unique" unique ("email");',
    );

    this.addSql(
      'alter table "roles" add constraint "roles_created_by_id_foreign" foreign key ("created_by_id") references "identities" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "roles" add constraint "roles_updated_by_id_foreign" foreign key ("updated_by_id") references "identities" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "roles" add constraint "roles_deleted_by_id_foreign" foreign key ("deleted_by_id") references "identities" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "identities" add constraint "identities_created_by_id_foreign" foreign key ("created_by_id") references "identities" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "identities" add constraint "identities_updated_by_id_foreign" foreign key ("updated_by_id") references "identities" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "identities" add constraint "identities_deleted_by_id_foreign" foreign key ("deleted_by_id") references "identities" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "identities" add constraint "identities_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "identities" drop constraint "identities_role_id_foreign";',
    );

    this.addSql(
      'alter table "roles" drop constraint "roles_created_by_id_foreign";',
    );

    this.addSql(
      'alter table "roles" drop constraint "roles_updated_by_id_foreign";',
    );

    this.addSql(
      'alter table "roles" drop constraint "roles_deleted_by_id_foreign";',
    );

    this.addSql(
      'alter table "identities" drop constraint "identities_created_by_id_foreign";',
    );

    this.addSql(
      'alter table "identities" drop constraint "identities_updated_by_id_foreign";',
    );

    this.addSql(
      'alter table "identities" drop constraint "identities_deleted_by_id_foreign";',
    );

    this.addSql('drop table if exists "roles" cascade;');

    this.addSql('drop table if exists "identities" cascade;');
  }
}
