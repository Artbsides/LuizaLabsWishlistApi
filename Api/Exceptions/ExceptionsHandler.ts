import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { UUID, randomUUID } from "crypto";
import { InternalServerErrorException } from "./Throws/InternalServerErrorException";

@Catch()
export class ExceptionsHandler implements ExceptionFilter {
  private readonly id: UUID = randomUUID();
  private readonly logger: Logger = new Logger("ExceptionsHandler");

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const httpException = await this
      .getException(exception as HttpException);

    const status: HttpStatus = httpException
      .getStatus();

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error.apply(this.logger, [
        httpException.message + ` {#: ${this.id}}`, httpException.stack
      ]);
    }

    await host.switchToHttp().getResponse<FastifyReply>().status(status)
      .send(this.getResponse(httpException));
  }

  async getException(exception: HttpException): Promise<HttpException> {
    return await import(`./Throws/${exception.name}`)
      .then(_ => new _[exception.name]()).catch(() => exception.hasOwnProperty("status")
        ? exception
        : new InternalServerErrorException(exception.stack)
    );
  }

  getResponse(exception: HttpException): object {
    const response = exception
      .getResponse();

    return {
      id: this.id,
      response: {
        reason: exception.message
          .replace(" Exception", ""),
        errors: response["message"] !== exception.message
          ? response["message"]
          : undefined
      }
    };
  }
}
