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

  async create(data: CreateDto): Promise<Account> {
    if (await this.retrieveBy({ email: data.email }))
      throw new UniqueConstraintException({ error: "email needs to be unique" });

    const account: Account = { ...data,
      id: randomUUID()
    }

    return this.accounts.push(account), account;
  }

  async retrieveBy(user: AccountPartial): Promise<Account|undefined> {
    const account = this.accounts.find(account => user?.id
      ? account.email == user.email && account.id == user.id
      : account.email == user.email);

    return account;
  }

  async updateBy(user: AccountPartial, data: UpdateByDto): Promise<Account> {
    if (data.email && data.email !== user.email && await this.retrieveBy({ email: data.email }))
      throw new UniqueConstraintException({ error: "email already registered" });

    const account = this.accounts
      .findIndex(account => account.id == user.id);

    if (account < 0)
      throw new NotFoundException();

    this.accounts[account] = {
      ...this.accounts[account], ...data };

    return this.accounts[account];
  }

  async deleteBy(user: AccountPartial): Promise<void> {
    const account = this.accounts
      .findIndex(account => account.id == user.id);

    if (account < 0)
      throw new NotFoundException();

    this.accounts.splice(account, 1);
  }
}
