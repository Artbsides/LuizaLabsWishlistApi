import { Type } from "class-transformer";
import { IsUUID } from "class-validator";

export class RetrieveByDto {
  @IsUUID()
  @Type(() => String)
  id: string;
}
