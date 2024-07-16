import { faker } from "@faker-js/faker";
import { IProduct } from "../interfaces";

export const generateFakeData: () => IProduct[] = () => {
  return Array.from({ length: 25 }, (_, idx) => {
    return {
      id: idx + 1,
      title: faker.commerce.productName(),
      desc: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 100, max: 500, symbol: "$" }),
      image: faker.image.urlPicsumPhotos(),
    };
  });
};
