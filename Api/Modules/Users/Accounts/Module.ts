import { Module, forwardRef } from "@nestjs/common";
import { AccountsService } from "./v1/Service";
import { AccountsInMemoryRepository } from "./v1/Repositories/InMemoryRepository";
import { AccountsController } from "./v1/Controller";
import { AuthenticationsModule } from "../Authentications/Module";

@Module({
  imports: [
    forwardRef(() => AuthenticationsModule)
  ],
  providers: [
    AccountsService,
    AccountsInMemoryRepository
  ],
  controllers: [
    AccountsController
  ],
  exports: [
    AccountsService
  ]
})
export class AccountsModule {}
