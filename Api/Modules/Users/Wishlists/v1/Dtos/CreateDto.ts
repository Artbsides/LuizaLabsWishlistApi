import { Type } from "class-transformer";
import { IsUUID } from "class-validator";

export class CreateDto {
  @IsUUID()
  @Type(() => String)
  id: string;
}
