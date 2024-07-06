import express from "express";
import { generateFakeData } from "./utils/fakeData";
import { IProduct } from "./interfaces";

const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>Hello Express</h1>`);
});

const dummyProducts: IProduct[] = generateFakeData();

app.get("/products", (req, res) => {
  const filterQuery = req.query.filter as string;

  if (filterQuery) {
    const propertiesToFilter = filterQuery.split(",");
    let filteredProducts: any = {};

    filteredProducts = dummyProducts.map((product) => {
      propertiesToFilter.forEach((property) => {
        if (product.hasOwnProperty(property as keyof IProduct)) {
          filteredProducts[property] = product[property as keyof IProduct];
        }
      });
      return { id: product.id, ...filteredProducts };
    });
    return res.send(filteredProducts);
  }
  return res.send(dummyProducts);
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
