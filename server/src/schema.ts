import { buildSchema } from "type-graphql";
import { PostResolver } from "@resolvers/post";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [PostResolver],
    emitSchemaFile: true,
    validate: true,
  });
};
