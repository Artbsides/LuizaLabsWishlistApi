import { Expose, Type } from "class-transformer";
import { Product } from "./Product";
import { PaginationMeta } from "Api/SharedResources/Models/PaginationMeta";

export class ProductPaginated {
  @Type(() => Product)
  @Expose({
    name: "data",
    toPlainOnly: true
  })
  products: Product[];

  @Type(() => PaginationMeta)
  @Expose()
  meta: PaginationMeta;
}
