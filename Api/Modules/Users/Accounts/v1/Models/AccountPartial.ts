import { PartialType } from "@nestjs/swagger";
import { Account } from "./Account";

export class AccountPartial extends PartialType(Account) {
  constructor(data: AccountPartial) {
    super();

    Object.assign(this, data)
  }
};
