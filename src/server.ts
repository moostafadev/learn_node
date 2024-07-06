import express from "express";
import { generateFakeData } from "./utils/fakeData";

const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>Hello Express</h1>`);
});

const dummyProducts = generateFakeData();

app.get("/products", (req, res) => {
  res.send(dummyProducts);
});

app.get("/products/:id", (req, res) => {
  const productId = +req.params.id;

  if (isNaN(productId)) {
    res.status(404).send({ message: "Invalid product ID" });
  }

  const findProduct = dummyProducts.find((product) => product.id === productId);
  if (findProduct) {
    res.send(findProduct);
  }

  res.status(404).send({ message: "Product not found" });
});

const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});
