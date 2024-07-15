import express from "express";
import { generateFakeData } from "./utils/fakeData";
import { IProduct } from "./interfaces";
import ProductController from "./controllers/productController";
import ProductsService from "./services/ProductService";

const app = express();

app.use(express.json());
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.send(`<h1>Hello Express</h1>`);
});

const dummyProducts: IProduct[] = generateFakeData();

const productService = new ProductsService(dummyProducts);
const productController = new ProductController(productService);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/products", (req, res) => productController.getProducts(req, res));
app.get("/products/:id", (req, res) =>
  productController.getProductId(req, res)
);
app.post("/products", (req, res) => productController.createProduct(req, res));
app.patch("/products/:id", (req, res) =>
  productController.updateProduct(req, res)
);
app.delete("/products/:id", (req, res) =>
  productController.deleteProduct(req, res)
);

const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});
