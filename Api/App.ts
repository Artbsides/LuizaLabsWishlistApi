import { NestFactory, Reflector } from "@nestjs/core";
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from "@nestjs/common";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { AppModule } from "./AppModule";
import { ExceptionsHandler } from "./Exceptions/ExceptionsHandler";
import { Docs } from "./Confs/Docs";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,
    new FastifyAdapter());

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: "ApiVersion"
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

  app.useGlobalFilters(
    new ExceptionsHandler());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), {
    excludeExtraneousValues: true
  }));

  if (process.env.NODE_ENV != "production")
    Docs.useSwagger(app);

  await app.listen(Number(process.env.NODE_PORT), process.env.NODE_HOST as string);
}

bootstrap();
