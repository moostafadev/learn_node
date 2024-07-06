import { faker } from "@faker-js/faker";

export const generateFakeData = () => {
  return Array.from({ length: 25 }, (_, idx) => {
    return {
      id: idx + 1,
      name: faker.commerce.productName(),
      desc: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 100, max: 500, symbol: "$" }),
    };
  });
};
