import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { NotFoundException } from "Api/Exceptions/Throws/NotFoundException";
import { RetrieveDto } from "../Dtos/RetrieveDto";
import { DeleteByDto } from "../Dtos/DeleteByDto";
import { Product } from "Api/Modules/Stores/Products/v1/Models/Product";
import { Wishlist } from "../Models/Wishlist";
import { AccountPartial } from "Api/Modules/Users/Accounts/v1/Models/AccountPartial";

@Injectable()
export class WishlistsInMemoryRepository {
  protected wishlist: Wishlist[] = [];

  async create(user: AccountPartial, data: Product): Promise<Wishlist> {
    const product: Wishlist = { id: randomUUID(),
      user: {
        id: user.id as string
      },
      product: data
    };

    return this.wishlist.push(product), product;
  }

  async retrieve(user: AccountPartial, query: RetrieveDto): Promise<Wishlist[]> {
    const products = this.wishlist
      .filter(product => product.user.id == user.id);

    return products?.slice((Number(query.page) - 1) * 2, Number(query.page) * 2) ?? [];
  }

  async retrieveBy(user: AccountPartial, data: Product): Promise<Wishlist|undefined> {
    const wishlist = this.wishlist
      .find(product => product.product.id == data.id && product.user.id == user.id);

    return wishlist;
  }

  async deleteBy(user: AccountPartial, params: DeleteByDto): Promise<void> {
    const product = this.wishlist
      .findIndex(product => product.id == params.id && product.user.id == user.id);

    if (product < 0)
      throw new NotFoundException();

    this.wishlist.splice(product, 1);
  }
}
