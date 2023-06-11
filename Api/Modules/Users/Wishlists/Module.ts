import { Module } from "@nestjs/common";
import { ProductsModule } from "Api/Modules/Stores/Products/Module";
import { AuthenticationsModule } from "../Authentications/Module";
import { WishlistsService } from "./v1/Service";
import { WishlistsInMemoryRepository } from "./v1/Repositories/InMemoryRepository";
import { WishlistsController } from "./v1/Controller";

@Module({
  imports: [
    ProductsModule,
    AuthenticationsModule
  ],
  providers: [
    WishlistsService,
    WishlistsInMemoryRepository
  ],
  controllers: [
    WishlistsController
  ]
})
export class WishlistsModule {}
