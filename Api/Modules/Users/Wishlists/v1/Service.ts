import { Injectable } from "@nestjs/common";
import { WishlistsInMemoryRepository } from "./Repositories/InMemoryRepository";
import { ProductsService } from "Api/Modules/Stores/Products/v1/Service";
import { CreateDto } from "./Dtos/CreateDto";
import { RetrieveDto } from "./Dtos/RetrieveDto";
import { DeleteByDto } from "./Dtos/DeleteByDto";
import { AccountPartial } from "../../Accounts/v1/Models/AccountPartial";
import { Wishlist } from "./Models/Wishlist";
import { UniqueConstraintException } from "Api/Exceptions/Throws/UniqueConstraintException";
import { Product } from "Api/Modules/Stores/Products/v1/Models/Product";

@Injectable()
export class WishlistsService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly inMemoryRepository: WishlistsInMemoryRepository
  ) {}

  async create(user: AccountPartial, data: CreateDto): Promise<Wishlist> {
    const product = this.inMemoryRepository.retrieveBy(user, data as Product)

    if (product)
      throw new UniqueConstraintException({ error: "id already registered" });

    return this.inMemoryRepository
      .create(user, await this.productsService.retrieveBy(data));
  }

  retrieve(user: AccountPartial, query: RetrieveDto): Wishlist[] {
    return this.inMemoryRepository.retrieve(user, query);
  }

  deleteBy(user: AccountPartial, params: DeleteByDto): void {
    this.inMemoryRepository.deleteBy(user, params);
  }
}
