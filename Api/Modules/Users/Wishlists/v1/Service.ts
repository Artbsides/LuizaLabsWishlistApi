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
    const product = await this.inMemoryRepository.retrieveBy(user, data as Product)

    if (product)
      throw new UniqueConstraintException({ error: "id already registered" });

    return await this.inMemoryRepository
      .create(user, await this.productsService.retrieveBy(data));
  }

  async retrieve(user: AccountPartial, query: RetrieveDto): Promise<Wishlist[]> {
    return await this.inMemoryRepository.retrieve(user, query);
  }

  async deleteBy(user: AccountPartial, params: DeleteByDto): Promise<void> {
    await this.inMemoryRepository.deleteBy(user, params);
  }
}
