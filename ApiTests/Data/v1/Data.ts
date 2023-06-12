import { faker } from "@faker-js/faker";

export const payload: Record<string, any> = {
  name: faker.person.fullName(),
  email: faker.internet.email()
};
