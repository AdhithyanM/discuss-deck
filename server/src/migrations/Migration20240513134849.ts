import { Migration } from '@mikro-orm/migrations';

export class Migration20240513134849 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "posts" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null);');

    this.addSql('drop table if exists "post" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null);');

    this.addSql('drop table if exists "posts" cascade;');
  }

}
