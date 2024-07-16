import { Request, Response } from "express";
import ProductsService from "../services/ProductService";

export default class ProductsViewContoller {
  constructor(private productService: ProductsService) {
    this.renderProductsList = this.renderProductsList.bind(this);
    this.renderProductItem = this.renderProductItem.bind(this);
  }

  renderProductsList(req: Request, res: Response) {
    res.render("products", {
      pageTitle: "Products page",
      products: this.productService.findAll(),
    });
  }

  renderProductItem(req: Request, res: Response) {
    const id = +req.params.id;
    res.render("product", {
      product: this.productService.getProductById(id),
    });
  }
}
