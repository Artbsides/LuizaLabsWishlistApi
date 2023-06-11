import { Type } from "class-transformer";
import { IsEmail } from "class-validator";

export class AuthenticationDto {
  @IsEmail()
  @Type(() => String)
  email: string;
}
