import { Post } from "@entities/Post.entity";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts() {
    return "bye";
  }
}
