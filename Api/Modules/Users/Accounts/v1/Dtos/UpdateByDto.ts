import { Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateByDto {
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => value?.trim() ?? "")
  @Type(() => String)
  name?: string;

  @IsEmail()
  @IsOptional()
  @Transform(({ value }) => value?.trim() ?? "")
  @Type(() => String)
  email?: string;
}
