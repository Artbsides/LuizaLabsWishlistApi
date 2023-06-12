import { Injectable } from "@nestjs/common";
import { RequestsService } from "Api/SharedResources/Services/RequestsService";
import { RetrieveDto } from "../Dtos/RetrieveDto";
import { RetrieveByDto } from "../Dtos/RetrieveByDto";
import { ProductPaginated } from "../Models/ProductPaginated";
import { Product } from "../Models/Product";

@Injectable()
export class ProductsHttpRepository {
  constructor(
    private readonly requestsService: RequestsService
  ) {}

  async retrieve(query: RetrieveDto): Promise<ProductPaginated> {
    const response = await this.requestsService
      .get<ProductPaginated>(`?page=${query.page}`);

    return response.data;
  }

  async retrieveBy(params: RetrieveByDto): Promise<Product> {
    const response = await this.requestsService
      .get<Product>(`${params.id}/`);

    return response.data;
  }
}
