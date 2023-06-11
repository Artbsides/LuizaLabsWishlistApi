import { Expose, Type } from "class-transformer";

export class PaginationMeta {
  @Type(() => Number)
  @Expose()
  page_size: number;

  @Type(() => Number)
  @Expose()
  page_number: number;
}
