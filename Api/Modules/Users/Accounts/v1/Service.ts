import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { AccountsInMemoryRepository } from "./Repositories/InMemoryRepository";
import { AuthenticationsService } from "../../Authentications/v1/Service";
import { ForbiddenException } from "Api/Exceptions/Throws/ForbiddenException";
import { CreateDto } from "./Dtos/CreateDto";
import { UpdateByDto } from "./Dtos/UpdateByDto";
import { Account } from "./Models/Account";
import { Authentication } from "../../Authentications/v1/Models/Authentication";
import { AccountPartial } from "./Models/AccountPartial";

@Injectable()
export class AccountsService {
  constructor(
    private readonly inMemoryRepository:
      AccountsInMemoryRepository,

    @Inject(forwardRef(() => AuthenticationsService)) private readonly authService: AuthenticationsService
  ) {}

  async create(data: CreateDto): Promise<Authentication> {
    const account = this.inMemoryRepository
      .create(data);

    return await this.authService.authenticate({ id: account.id }, account);
  }

  retrieveBy(user: AccountPartial): Account {
    const account = this.inMemoryRepository
      .retrieveBy(user);

    if (!account)
      throw new ForbiddenException();

    return account;
  }

  async updateBy(user: AccountPartial, data: UpdateByDto): Promise<Authentication> {
    const account = this.inMemoryRepository
      .updateBy(user, data);

    return await this.authService.authenticate({ id: account.id }, account);
  }

  deleteBy(user: AccountPartial): void {
    this.inMemoryRepository.deleteBy(user);
  }
}
