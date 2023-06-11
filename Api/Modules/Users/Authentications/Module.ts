import { Module, forwardRef } from "@nestjs/common";
import { AccountsModule } from "../Accounts/Module";
import { AuthenticationsService } from "./v1/Service";
import { AuthenticationsController } from "./v1/Controller";

@Module({
  imports: [
    forwardRef(() => AccountsModule)
  ],
  providers: [
    AuthenticationsService
  ],
  controllers: [
    AuthenticationsController
  ],
  exports: [
    AuthenticationsService
  ]
})
export class AuthenticationsModule {}
