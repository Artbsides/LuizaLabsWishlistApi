import { HttpException, HttpStatus } from "@nestjs/common";

export class InternalServerErrorException extends HttpException {
  constructor(stack?: string) {
    super("Internal Server Error",
      HttpStatus.INTERNAL_SERVER_ERROR);

    if (stack)
      this.stack = stack;
  }
}
