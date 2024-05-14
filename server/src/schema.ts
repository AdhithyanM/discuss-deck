import { buildSchema } from "type-graphql";
import { HelloResolver } from "@resolvers/hello";
import { PostResolver } from "@resolvers/post";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [HelloResolver, PostResolver],
    emitSchemaFile: true,
    validate: true,
  });
};
