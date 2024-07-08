import { IProduct } from "../interfaces";

export default class ProductsService {
  constructor(private products: IProduct[]) {
    this.products = products;
  }

  findAll() {
    return this.products;
  }
}
