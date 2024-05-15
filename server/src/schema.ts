import { buildSchema } from "type-graphql";
import { PostResolver } from "@resolvers/post";
import { UserResolver } from "@resolvers/user";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [PostResolver, UserResolver],
    emitSchemaFile: true,
    validate: true,
  });
};
