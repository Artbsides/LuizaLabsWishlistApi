import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ForbiddenException } from "Api/Exceptions/Throws/ForbiddenException";
import { AccountPartial } from "Api/Modules/Users/Accounts/v1/Models/AccountPartial";
import { AuthenticationsService } from "Api/Modules/Users/Authentications/v1/Service";
import { Payload } from "Api/SharedResources/Types/Payload";
import { UserRequest } from "Api/SharedResources/Types/UserRequest";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthenticationsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: UserRequest = context.switchToHttp()
      .getRequest();

    const token = this
      .extractTokenFromHeader(request);

    if (!token)
      throw new ForbiddenException();

    try {
      const payload = await this.jwtService
        .verifyAsync<Payload>(token, { secret: process.env.JWT_SECRET });

      await this.authService.validate(payload);

      request.user = new AccountPartial({ id: payload.sub, email: payload.email });
    }
    catch {
      throw new ForbiddenException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string|undefined {
    const [ type, token ] = request.headers["authorization"]
      ?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }
}
