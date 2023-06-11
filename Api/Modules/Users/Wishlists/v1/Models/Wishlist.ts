import { Expose, Type } from "class-transformer";
import { Product } from "Api/Modules/Stores/Products/v1/Models/Product";
import { Account } from "Api/Modules/Users/Accounts/v1/Models/Account";

export class Wishlist {
  @Type(() => String)
  @Expose()
  id: string;

  @Type(() => Product)
  @Expose()
  product: Product;

  @Type(() => String)
  user: Pick<Account, "id">
}
