import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello.js";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [HelloResolver],
    emitSchemaFile: false,
    validate: false,
  });
};
