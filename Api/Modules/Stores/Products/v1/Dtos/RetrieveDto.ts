import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min } from "class-validator";

export class RetrieveDto {
  @Min(1)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;
}
