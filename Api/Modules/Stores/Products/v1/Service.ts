import { Injectable } from "@nestjs/common";
import { ProductsHttpRepository } from "./Repositories/HttpRepository";
import { RetrieveDto } from "./Dtos/RetrieveDto";
import { RetrieveByDto } from "./Dtos/RetrieveByDto";
import { ProductPaginated } from "./Models/ProductPaginated";
import { Product } from "./Models/Product";

@Injectable()
export class ProductsService {
  constructor(
    private readonly httpRepository: ProductsHttpRepository
  ) {}

  async retrieve(query: RetrieveDto): Promise<ProductPaginated> {
    return await this.httpRepository.retrieve(query);
  }

  async retrieveBy(params: RetrieveByDto): Promise<Product> {
    return await this.httpRepository.retrieveBy(params);
  }
}
