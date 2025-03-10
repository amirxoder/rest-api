import { faker } from "@faker-js/faker";

const productsFakeGenerator = (count = 10) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
  }));
};

export const fakeProducts = productsFakeGenerator(10);
