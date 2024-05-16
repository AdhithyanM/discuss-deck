import config from "config";
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import mikroORMConfig from "./mikro-orm.config";
import express, { Application } from "express";
import { ApolloServer } from "@apollo/server";
import { createSchema } from "./schema";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import session, { CookieOptions } from "express-session";
import RedisStore from "connect-redis";
import Redis from "ioredis";
import { __prod__ } from "./constants";

const main = async () => {
  const orm = await MikroORM.init(mikroORMConfig);
  const migrator = orm.getMigrator();
  await migrator.up();

  const redisClient = new Redis();
  const redisStore = new RedisStore({
    client: redisClient,
    disableTouch: true,
  });

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

  const cookieOptions: CookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
    sameSite: "lax", // csrf
    secure: __prod__, // cookie only works in https
  };

  app.use(
    session({
      name: "qid",
      store: redisStore,
      cookie: cookieOptions,
      secret: config.get("redis.secretKey"),
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({
        em: orm.em.fork(),
        req,
        res,
      }),
    })
  );

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
