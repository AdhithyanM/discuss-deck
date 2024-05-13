import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import mikroORMConfig from "./mikro-orm.config.js";
import { Post } from "./entities/post.entity.js";

const main = async () => {
  const orm = await MikroORM.init(mikroORMConfig);
  const migrator = orm.getMigrator();
  await migrator.up();

  // fork first to have a separate context
  const em = orm.em.fork();

  // const post = new Post();
  // post.title = "my first post";
  // await em.persistAndFlush(post);
  // console.log("post", post);

  const posts = await em.find(Post, {});
  console.log(posts);
};

main().catch((err) => {
  console.log(err);
});
