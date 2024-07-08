import { Request } from "express";
import { IProduct } from "../interfaces";
import ProductsService from "../services/ProductService";

class ProductController {
  constructor(private productService: ProductsService) {}

  getProducts(req: Request): IProduct[] {
    const filterQuery = req.query.filter as string;
    if (filterQuery) {
      return this.productService.filterByQuery(filterQuery);
    }
    return this.productService.findAll();
  }
}

export default ProductController;
