import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { UsersRouter } from "./Modules/Users/Router";
import { StoresRouter } from "./Modules/Stores/Router";
import { ApiKeyAuthGuard, ApiKeyStrategy } from "./Confs/Authorization";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "1h"
      }
    }),
    UsersRouter,
    StoresRouter
  ],
  providers: [
    ApiKeyStrategy, {
      provide: APP_GUARD,
      useClass: ApiKeyAuthGuard
    }
  ]
})
export class AppModule {}
