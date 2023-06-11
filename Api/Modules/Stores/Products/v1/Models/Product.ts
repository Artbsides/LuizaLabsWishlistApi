import { Expose, Type } from "class-transformer";
import { IsUrl } from "class-validator";

export class Product {
  @Type(() => String)
  @Expose()
  id: string;

  @Type(() => String)
  @Expose()
  title: string;

  @Type(() => Number)
  @Expose()
  price: number;

  @IsUrl({
    protocols: [
      "http",
      "https"
    ]
  })
  @Type(() => String)
  @Expose()
  image: string;

  @Type(() => String)
  @Expose({
    name: "review",
    toPlainOnly: true
  })
  reviewScore?: string;
}
