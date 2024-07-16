import { Router } from "express";
import { IProduct } from "../interfaces";
import { generateFakeData } from "../utils/fakeData";
import ProductsService from "../services/ProductService";
import ProductsViewContoller from "../controllers/productsViewController";

const productsRenderRouter = Router();

const dummyProducts: IProduct[] = generateFakeData();

const productService = new ProductsService(dummyProducts);
const { renderProductsList, renderProductItem } = new ProductsViewContoller(
  productService
);

productsRenderRouter.route("/").get(renderProductsList);
productsRenderRouter.route("/:id").get(renderProductItem);

export default productsRenderRouter;
