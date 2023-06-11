import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateDto {
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @Type(() => String)
  name: string;

  @IsEmail()
  @Type(() => String)
  email: string;
}
