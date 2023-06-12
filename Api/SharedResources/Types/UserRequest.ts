import { FastifyRequest } from "fastify";
import { AccountPartial } from "Api/Modules/Users/Accounts/v1/Models/AccountPartial";

export type UserRequest = FastifyRequest & {
  user: AccountPartial;
}
