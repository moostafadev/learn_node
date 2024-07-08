import { IProduct } from "../interfaces";

export class ProductsService {
  private readonly products: IProduct[] = [];

  findAll() {
    return this.products;
  }
}
