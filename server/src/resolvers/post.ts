import { Post } from "@entities/post";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts() {
    return "bye";
  }
}
