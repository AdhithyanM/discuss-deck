import config from "config";
import { Options, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { __prod__ } from "./constants";
import { Migrator, TSMigrationGenerator } from "@mikro-orm/migrations";

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
  extensions: [Migrator],
  migrations: {
    path: "dist/migrations",
    pathTs: "src/migrations",
    glob: "!(*.d).{js,ts}",
    transactional: true,
    disableForeignKeys: true,
    allOrNothing: true,
    dropTables: true,
    safe: false,
    snapshot: true,
    emit: "ts",
    generator: TSMigrationGenerator,
  },
};

export default mikroORMConfig;
