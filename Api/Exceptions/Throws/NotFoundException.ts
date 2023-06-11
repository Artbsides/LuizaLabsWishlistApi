import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundException extends HttpException {
  constructor() {
    super("Resource Not Found or Deprecated", HttpStatus.NOT_FOUND);
  }
}
