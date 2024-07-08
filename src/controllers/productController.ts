import { IProduct } from "../interfaces";
import ProductsService from "../services/ProductService";

class ProductController {
  constructor(private productService: ProductsService) {}

  getProducts(): IProduct[] {
    return this.productService.findAll();
  }
}

export default ProductController;
