import { Controller, Get, Param, Query } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ProductsService } from "./Service";
import { RetrieveDto } from "./Dtos/RetrieveDto";
import { RetrieveByDto } from "./Dtos/RetrieveByDto";
import { ProductPaginated } from "./Models/ProductPaginated";
import { Product } from "./Models/Product";

@Controller({ version: "1" })
export class ProductsController {
  constructor(
    private readonly service: ProductsService
  ) {}

  @Get()
  async retrieve(@Query() query: RetrieveDto): Promise<ProductPaginated> {
    const response = await this.service
      .retrieve(query);

    return plainToInstance(ProductPaginated, response);
  }

  @Get(":id")
  async retrieveBy(@Param() params: RetrieveByDto): Promise<Product> {
    const response =  await this.service
      .retrieveBy(params);

    return plainToInstance(Product, response);
  }
}
