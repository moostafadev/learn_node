import { Request, Response } from "express";
import ProductsService from "../services/ProductService";

export default class ProductsViewContoller {
  constructor(private productService: ProductsService) {
    this.renderProductsList = this.renderProductsList.bind(this);
    this.renderProductItem = this.renderProductItem.bind(this);
  }

  renderProductsList(req: Request, res: Response) {
    throw new Error("ERROR");
    res.render("products", {
      titlePage: "Products",
      products: this.productService.findAll(),
    });
  }

  renderProductItem(req: Request, res: Response) {
    const id = +req.params.id;
    res.render("product", {
      titlePage: `product - ${id}`,
      product: this.productService.getProductById(id),
    });
  }
}
