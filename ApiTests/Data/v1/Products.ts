import { faker } from "@faker-js/faker";

export const products: Record<string, any> = {
  data: Array.from({ length: 200 }, i => {
    return {
      id: faker.string.uuid(),
      title: faker.commerce.productName(),
      price: faker.commerce.price({ min: 1, max: 999, dec: 2, symbol: "R$ "}).replace(".", ","),
      image: faker.image.url()
    }
  }),
  meta: {
    page_size: 100,
    page_number: 1
  }
};
