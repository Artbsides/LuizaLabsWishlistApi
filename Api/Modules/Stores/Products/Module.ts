import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ProductsService } from "./v1/Service";
import { ProductsHttpRepository } from "./v1/Repositories/HttpRepository";
import { RequestsService } from "Api/SharedResources/Services/RequestsService";
import { ProductsController } from "./v1/Controller";

@Module({
  imports: [
    HttpModule.register({
      baseURL: "http://challenge-api.luizalabs.com/api/product/"
    })
  ],
  providers: [
    ProductsService,
    ProductsHttpRepository,
    RequestsService
  ],
  controllers: [
    ProductsController
  ],
  exports: [
    ProductsService
  ]
})
export class ProductsModule {}
