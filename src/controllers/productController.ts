import { Request, Response } from "express";
import { IProduct } from "../interfaces";
import ProductsService from "../services/ProductService";

class ProductController {
  constructor(private productService: ProductsService) {}

  getProducts(req: Request, res: Response) {
    const filterQuery = req.query.filter as string;

    if (filterQuery) {
      return res.send(this.productService.filterByQuery(filterQuery));
    }

    return res.send(this.productService.findAll());
  }

  getProductId(req: Request, res: Response) {
    const productId = +req.params.id;
    const product: IProduct | undefined =
      this.productService.getProductById(productId);

    if (product) {
      res.send(product);
    }

    if (isNaN(productId)) {
      res.status(404).send({ message: "Invalid product ID" });
    }

    res.status(404).send({ message: "Product not found" });
  }
}

export default ProductController;
