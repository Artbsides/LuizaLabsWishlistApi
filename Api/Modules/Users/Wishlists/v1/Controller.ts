import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post,
  Query, Request, UseGuards } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { WishlistsService } from "./Service";
import { JwtAuthGuard } from "Api/Confs/Authentication";
import { UserRequest } from "Api/SharedResources/Types/UserRequest";
import { CreateDto } from "./Dtos/CreateDto";
import { RetrieveDto } from "./Dtos/RetrieveDto";
import { DeleteByDto } from "./Dtos/DeleteByDto";
import { Wishlist } from "./Models/Wishlist";
import { WishlistPaginated } from "./Models/WishlistPaginated";

@Controller({ version: "1" })
export class WishlistsController {
  constructor(
    private readonly service: WishlistsService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() request: UserRequest, @Body() data: CreateDto): Promise<Wishlist> {
    const response = await this.service
      .create(request.user, data);

    return plainToInstance(Wishlist, response);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  retrieve(@Request() request: UserRequest, @Query() query: RetrieveDto): WishlistPaginated {
    const data = this.service
      .retrieve(request.user, query);

    return plainToInstance(WishlistPaginated, {
      meta: {
        page_number: query.page,
        page_size: data.length
      },
      data
    });
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteBy(@Request() request: UserRequest, @Param() params: DeleteByDto): void {
    this.service.deleteBy(request.user, params);
  }
}
