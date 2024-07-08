import ProductsService from "../services/ProductService";

class ProductController {
  constructor(private productService: ProductsService) {}

  getProducts() {
    return this.productService.findAll();
  }
}

export default ProductController;
