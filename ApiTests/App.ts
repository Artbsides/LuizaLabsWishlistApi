import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "Api/AppModule";
import { ExceptionsHandler } from "Api/Exceptions/ExceptionsHandler";

export class App {
  server: NestFastifyApplication;

  async create(): Promise<TestingModule> {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule
      ]
    }).compile();

    this.server = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter());

    this.server.enableVersioning({
      type: VersioningType.HEADER,
      header: "ApiVersion"
    });

    this.server.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true
    }));

    this.server.useGlobalFilters(
      new ExceptionsHandler());

    this.server.useGlobalInterceptors(new ClassSerializerInterceptor(this.server.get(Reflector), {
      excludeExtraneousValues: true
    }));

    await this.server.init();
    await this.server.getHttpAdapter().getInstance().ready();

    return module;
  }
}
