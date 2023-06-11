import { Body, Controller, Post, Response } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { plainToInstance } from "class-transformer";
import { AuthenticationsService } from "./Service";
import { AuthenticationDto } from "./Dtos/AuthenticationDto";
import { Account } from "../../Accounts/v1/Models/Account";

@Controller({ version: "1" })
export class AuthenticationsController {
  constructor(
    private readonly service: AuthenticationsService
  ) {}

  @Post()
  async authenticate(@Body() data: AuthenticationDto, @Response() response: FastifyReply): Promise<Account> {
    const { account, token } = await this.service
      .authenticate(data)

    return response.header("ACCESS-TOKEN", token)
     .send(plainToInstance(Account, account, { excludeExtraneousValues: true }));
  }
}
