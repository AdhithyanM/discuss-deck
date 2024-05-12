import config from "config";
import {
  Options,
  PostgreSqlDriver,
  // ReflectMetadataProvider,
} from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { __prod__ } from "./constants.js";

const mikroORMConfig: Options = {
  driver: PostgreSqlDriver,
  host: config.get("db.host"),
  port: config.get("db.port"),
  user: config.get("db.user"),
  password: config.get("db.password"),
  dbName: config.get("db.name"),
  entities: ["dist/entities"],
  entitiesTs: ["src/entities"],
  metadataProvider: TsMorphMetadataProvider,
  debug: !__prod__,
};

export default mikroORMConfig;
