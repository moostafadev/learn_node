import { IProduct } from "../interfaces";

export default class ProductsService {
  constructor(private products: IProduct[]) {
    this.products = products;
  }

  findAll(): IProduct[] {
    return this.products;
  }
  filterByQuery(filterQuery?: string) {
    if (filterQuery) {
      const properriesToFilter = filterQuery.split(".");
      let filteredProducts = [];
      filteredProducts = this.findAll().map((product) => {
        const filteredProduct: any = {};
        properriesToFilter.forEach((property) => {
          if (product.hasOwnProperty(property as keyof IProduct)) {
            filteredProduct[property] = product[property as keyof IProduct];
          }
        });
        return { id: product.id, ...filteredProduct };
      });
      return filteredProducts;
    }

    return this.findAll();
  }
}
