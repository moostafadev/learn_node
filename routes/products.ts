import { Router } from "express";
import { IProduct } from "../interfaces";
import { generateFakeData } from "../utils/fakeData";
import ProductsService from "../services/ProductService";
import ProductController from "../controllers/productController";

const productsRouter = Router();

const dummyProducts: IProduct[] = generateFakeData();

const productService = new ProductsService(dummyProducts);
const {
  getProducts,
  createProduct,
  getProductId,
  updateProduct,
  deleteProduct,
} = new ProductController(productService);

productsRouter.route("/").get(getProducts).post(createProduct);
productsRouter
  .route("/:id")
  .get(getProductId)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productsRouter;
