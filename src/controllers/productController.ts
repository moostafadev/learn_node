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
      return res.send(product);
    }

    if (isNaN(productId)) {
      return res.status(404).send({ message: "Invalid product ID" });
    }

    return res.status(404).send({ message: "Product not found" });
  }

  createProduct(req: Request, res: Response) {
    const productBody = req.body;
    this.productService.createProduct(productBody);
    res.status(201).send({
      id: this.productService.findAll().length,
      title: productBody.title,
      price: productBody.price,
      desc: productBody.desc,
    });
  }

  updateProduct(req: Request, res: Response) {
    const productId = +req.params.id;
    if (isNaN(productId)) {
      return res.status(404).send({
        message: "Product not found!",
      });
    }
    const findProductId: number = this.productService
      .findAll()
      .findIndex((product) => product.id === productId);
    const productBody = req.body;
    if (findProductId === -1) {
      return res.status(404).send({
        message: "Product not found!",
      });
    }
    this.productService.updateProductByIndex(findProductId, productBody);
    return res.send(this.productService.findAll()[findProductId]);
  }
}

export default ProductController;
