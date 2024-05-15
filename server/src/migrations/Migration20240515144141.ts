import { Migration } from '@mikro-orm/migrations';

export class Migration20240515144141 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "posts" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "posts" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');

    this.addSql('alter table "users" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "users" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "posts" alter column "created_at" type date using ("created_at"::date);');
    this.addSql('alter table "posts" alter column "updated_at" type date using ("updated_at"::date);');

    this.addSql('alter table "users" alter column "created_at" type date using ("created_at"::date);');
    this.addSql('alter table "users" alter column "updated_at" type date using ("updated_at"::date);');
  }

}
