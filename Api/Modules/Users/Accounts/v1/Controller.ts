import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Patch, Post, Request, Response, UseGuards } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { AccountsService } from "./Service";
import { JwtAuthGuard } from "Api/Confs/Authentication";
import { UserRequest } from "Api/SharedResources/Types/UserRequest";
import { CreateDto } from "./Dtos/CreateDto";
import { UpdateByDto } from "./Dtos/UpdateByDto";
import { Account } from "./Models/Account";
import { plainToInstance } from "class-transformer";

@Controller({ version: "1" })
export class AccountsController {
  constructor(
    private readonly service: AccountsService
  ) {}

  @Post()
  async create(@Body() data: CreateDto, @Response() response: FastifyReply): Promise<Account> {
    const { account, token } = await this.service
      .create(data);

    return response.header("ACCESS-TOKEN", token)
      .send(plainToInstance(Account, account, { excludeExtraneousValues: true }));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async retrieveBy(@Request() request: UserRequest): Promise<Account> {
    const response = await this.service
      .retrieveBy(request.user);

    return plainToInstance(Account, response);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateBy(@Request() request: UserRequest, @Body() data: UpdateByDto, @Response() response: FastifyReply): Promise<void> {
    const { token } = await this.service
      .updateBy(request.user, data);

    response.header("ACCESS-TOKEN", token).send();
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBy(@Request() request: UserRequest): Promise<void> {
    await this.service.deleteBy(request.user);
  }
}
