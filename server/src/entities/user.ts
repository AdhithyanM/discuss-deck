import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity({ tableName: "users" })
export class User {
  [OptionalProps]?: "createdAt" | "updatedAt" | "password";

  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "datetime" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "datetime", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: "text", unique: true })
  username!: string;

  // not marking this as field to avoid exposing password in graphql schema
  @Property({ type: "text" })
  password!: string;
}
