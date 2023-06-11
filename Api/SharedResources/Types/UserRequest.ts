import { AccountPartial } from "Api/Modules/Users/Accounts/v1/Models/AccountPartial";

export type UserRequest = Request & {
  user: AccountPartial;
}
