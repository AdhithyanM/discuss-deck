import config from "config";
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import mikroORMConfig from "./mikro-orm.config.js";
import express, { Application } from "express";
import { ApolloServer } from "@apollo/server";
import { createSchema } from "./schema.js";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";

const main = async () => {
  const orm = await MikroORM.init(mikroORMConfig);
  const migrator = orm.getMigrator();
  await migrator.up();

  const app: Application = express();
  const httpServer = http.createServer(app);

  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apolloServer.start();

  app.use(cors<cors.CorsRequest>());
  app.use(express.json());

  app.use("/graphql", expressMiddleware(apolloServer));

  app.get("/health", (_, res) => {
    res.status(200).send("Okay!");
  });

  app.use("*", (_, res) => {
    return res.status(404).send({ message: "Invalid request" });
  });

  const port = config.get("app.port");
  httpServer.listen(port, () => {
    console.log(
      `${config.get(
        "app.name"
      )} listening on port ${port} and running on ${config.get("mode")} mode`
    );
  });
};

main().catch((err) => {
  console.error(err);
});
