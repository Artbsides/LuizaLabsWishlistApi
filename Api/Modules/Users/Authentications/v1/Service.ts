import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AccountsService } from "../../Accounts/v1/Service";
import { Account } from "../../Accounts/v1/Models/Account";
import { Authentication } from "./Models/Authentication";
import { AccountPartial } from "../../Accounts/v1/Models/AccountPartial";

@Injectable()
export class AuthenticationsService {
  constructor(
    private readonly jwtService:
      JwtService,

    @Inject(forwardRef(() => AccountsService)) private readonly accountsService: AccountsService
  ) {}

  async validate(user: AccountPartial): Promise<Account> {
    return await this.accountsService.retrieveBy(user);
  }

  async authenticate(data: AccountPartial, account?: Account): Promise<Authentication> {
    account = account
      ?? await this.validate(data);

    return { account: account, token: await this.jwtService.signAsync({ sub: account.id, email: account.email }) };
  }
}
