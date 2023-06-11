import { Expose, Type } from "class-transformer";

export class Account {
  @Type(() => String)
  @Expose()
  id: string;

  @Type(() => String)
  @Expose()
  name: string;

  @Type(() => String)
  @Expose()
  email: string;
}
