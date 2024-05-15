import { Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity({ tableName: "posts" })
export class Post {
  [OptionalProps]?: "createdAt" | "updatedAt";

  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "datetime" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "datetime", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property()
  title!: string;
}
