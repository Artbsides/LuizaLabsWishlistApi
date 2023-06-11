import { Type } from "class-transformer";
import { IsUUID } from "class-validator";

export class DeleteByDto {
  @IsUUID()
  @Type(() => String)
  id: string;
}
