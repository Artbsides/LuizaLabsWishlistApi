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

  validate(user: AccountPartial): Account {
    return this.accountsService.retrieveBy(user);
  }

  async authenticate(data: AccountPartial, account?: Account): Promise<Authentication> {
    account = account
      ?? this.validate(data);

    return { account: account, token: await this.jwtService.signAsync({ sub: account.id, email: account.email }) };
  }
}
