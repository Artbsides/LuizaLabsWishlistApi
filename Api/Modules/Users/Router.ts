import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { AccountsModule } from "./Accounts/Module";
import { WishlistsModule } from "./Wishlists/Module";
import { AuthenticationsModule } from "./Authentications/Module";

@Module({
  imports: [
    RouterModule.register([{
      path: "users",
      children: [
        {
          path: "account",
          module: AccountsModule
        },
        {
          path: "authentication",
          module: AuthenticationsModule
        },
        {
          path: "wishlist",
          module: WishlistsModule
        }
      ]
    }]),
    AccountsModule,
    AuthenticationsModule,
    WishlistsModule
  ]
})
export class UsersRouter {}
