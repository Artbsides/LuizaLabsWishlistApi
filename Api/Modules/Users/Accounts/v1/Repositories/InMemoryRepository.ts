import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { NotFoundException } from "Api/Exceptions/Throws/NotFoundException";
import { UniqueConstraintException } from "Api/Exceptions/Throws/UniqueConstraintException";
import { UpdateByDto } from "../Dtos/UpdateByDto";
import { Account } from "../Models/Account";
import { CreateDto } from "../Dtos/CreateDto";
import { AccountPartial } from "../Models/AccountPartial";

@Injectable()
export class AccountsInMemoryRepository {
  protected accounts: Account[] = [];

  create(data: CreateDto): Account {
    if (this.retrieveBy({ email: data.email }))
      throw new UniqueConstraintException({ error: "email needs to be unique" });

    const account: Account = { ...data,
      id: randomUUID()
    }

    return this.accounts.push(account), account;
  }

  retrieveBy(user: AccountPartial): Account | undefined {
    const account = this.accounts.find(account => user?.id
      ? account.email == user.email && account.id == user.id
      : account.email == user.email);

    return account;
  }

  updateBy(user: AccountPartial, data: UpdateByDto): Account {
    if (data.email && data.email !== user.email && this.retrieveBy({ email: data.email }))
      throw new UniqueConstraintException({ error: "email already registered" });

    const account = this.accounts
      .findIndex(account => account.id == user.id);

    if (account < 0)
      throw new NotFoundException();

    this.accounts[account] = {
      ...this.accounts[account], ...data };

    return this.accounts[account];
  }

  deleteBy(user: AccountPartial): void {
    const account = this.accounts
      .findIndex(account => account.id == user.id);

    if (account < 0)
      throw new NotFoundException();

    this.accounts.splice(account, 1);
  }
}
