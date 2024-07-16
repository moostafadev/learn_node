import { IProduct } from "../interfaces";

interface IProductBody {
  title: string;
  desc: string;
  price: string;
  image: string;
}

export default class ProductsService {
  constructor(private products: IProduct[]) {
    this.products = products;
  }

  findAll(): IProduct[] {
    return this.products;
  }

  filterByQuery(filterQuery?: string) {
    if (filterQuery) {
      const properriesToFilter = filterQuery.split(",");
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

  getProductById(productId: number) {
    return this.findAll().find((product) => product.id === productId);
  }

  createProduct(productBody: IProductBody) {
    return this.findAll().push({
      id: this.findAll().length + 1,
      ...productBody,
    });
  }

  updateProductByIndex(index: number, productBody: IProductBody) {
    return (this.findAll()[index] = {
      ...this.findAll()[index],
      ...productBody,
    });
  }

  deleteProductByIndex(index: number) {
    return this.findAll().filter((product) => product.id !== index + 1);
  }
}
