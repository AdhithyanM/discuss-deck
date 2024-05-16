import { User } from "@entities/user";
import {
  Resolver,
  Mutation,
  InputType,
  Field,
  Arg,
  Ctx,
  ObjectType,
  Query,
} from "type-graphql";
import { Context } from "types";
import argon2 from "argon2";
import { UniqueConstraintViolationException } from "@mikro-orm/core";

@InputType()
class UserRegistrationInput {
  @Field()
  username!: string;
  @Field()
  password!: string;
}

@ObjectType()
class FieldError {
  @Field()
  field!: string;
  @Field()
  message!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: Context): Promise<User | null> {
    if (!req.session.userId) {
      // not logged in.
      return null;
    }
    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserRegistrationInput,
    @Ctx() { em, req }: Context
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err instanceof UniqueConstraintViolationException) {
        return {
          errors: [{ field: "username", message: "username already taken." }],
        };
      }
    }

    // store user id in session
    // this will set a cookie on the user. keeping them logged in
    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UserRegistrationInput,
    @Ctx() { em, req }: Context
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          { field: "username", message: `Given username doesn't exists.` },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [{ field: "password", message: `Incorrect Password.` }],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }
}
