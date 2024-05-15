import { Migration } from '@mikro-orm/migrations';

export class Migration20240515143714 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" date not null, "updated_at" date not null, "username" text not null, "password" text not null);');
    this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('alter table "posts" alter column "created_at" type date using ("created_at"::date);');
    this.addSql('alter table "posts" alter column "updated_at" type date using ("updated_at"::date);');
  }

  async down(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "full_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "bio" text not null default \'\');');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('alter table "posts" alter column "created_at" type timestamptz using ("created_at"::timestamptz);');
    this.addSql('alter table "posts" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);');
  }

}
