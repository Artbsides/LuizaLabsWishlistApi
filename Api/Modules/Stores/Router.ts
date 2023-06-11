import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { ProductsModule } from "./Products/Module";

@Module({
  imports: [
    RouterModule.register([{
      path: "store",
      children: [
        {
          path: "products",
          module: ProductsModule
        }
      ]
    }]),
    ProductsModule
  ]
})
export class StoresRouter {}
