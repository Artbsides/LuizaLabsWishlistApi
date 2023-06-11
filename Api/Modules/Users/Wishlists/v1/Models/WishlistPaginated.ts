import { Expose, Type } from "class-transformer";
import { Wishlist } from "./Wishlist";
import { PaginationMeta } from "Api/SharedResources/Models/PaginationMeta";

export class WishlistPaginated {
  @Type(() => Wishlist)
  @Expose()
  data: Wishlist[];

  @Type(() => PaginationMeta)
  @Expose()
  meta: PaginationMeta;
}
