import express from "express";
import { generateFakeData } from "./utils/fakeData";
import { IProduct } from "./interfaces";
import ProductController from "./controllers/productController";
import ProductsService from "./services/ProductService";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Hello Express</h1>`);
});

const dummyProducts: IProduct[] = generateFakeData();

const productService = new ProductsService(dummyProducts);
const productController = new ProductController(productService);

app.get("/products", (req, res) => productController.getProducts(req, res));
app.get("/products/:id", (req, res) =>
  productController.getProductId(req, res)
);

// Create
app.post("/products", (req, res) => productController.createProduct(req, res));

// Update
app.patch("/products/:id", (req, res) =>
  productController.updateProduct(req, res)
);

// Delete
app.delete("/products/:id", (req, res) => {
  const productId = +req.params.id;
  if (isNaN(productId)) {
    return res.status(404).send({
      message: "Product not found!",
    });
  }

  const findProductId: number = dummyProducts.findIndex(
    (product) => product.id === productId
  );
  if (findProductId === -1) {
    return res.status(404).send({
      message: "Product not found!",
    });
  }
  const filteredProducts = dummyProducts.filter(
    (product) => product.id !== findProductId + 1
  );
  return res.send(filteredProducts);
});

const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});
