import { Injectable } from "@nestjs/common";
import { HeaderAPIKeyStrategy } from "passport-headerapikey";
import { VerifiedCallback } from "passport-jwt";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { UnauthorizedException } from "Api/Exceptions/Throws/UnauthorizedException";

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, "ApiKey") {
  private readonly keys: undefined|string[] =
    process.env.API_KEYS?.split(",");

  constructor() {
    super({ header: "ApiKey" }, true, (key: string, done: VerifiedCallback) => {
      if (this.keys?.find(value => key === value))
        return done(null, true);

      return done(new UnauthorizedException());
    });
  }
}

@Injectable()
export class ApiKeyAuthGuard extends AuthGuard("ApiKey") {}
