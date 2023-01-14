import { Migration } from '@mikro-orm/migrations';

export class Migration20230113091737 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "identities" add column "dob" timestamptz(0) null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "identities" drop column "dob";');
  }
}
