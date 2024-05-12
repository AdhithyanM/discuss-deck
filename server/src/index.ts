import { MikroORM } from "@mikro-orm/core";
import "reflect-metadata";

const main = async () => {
  const orm = await MikroORM.init();

  await orm.schema.refreshDatabase();
};

main().catch((err) => {
  console.log(err);
});
