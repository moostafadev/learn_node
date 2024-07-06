import express from "express";
import { generateFakeData } from "./utils/fakeData";
import { IProduct } from "./interfaces";

const app = express();

app.use(express.json());

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

// Create a new product
app.post("/products", (req, res) => {
  const newProduct = req.body;
  dummyProducts.push({ id: dummyProducts.length + 1, ...newProduct });
  res.status(201).send({
    id: dummyProducts.length + 1,
    title: newProduct.title,
    price: newProduct.price,
    desc: newProduct.desc,
  });
});

// Update
app.patch("/products/:id", (req, res) => {
  const productId = +req.params.id;
  if (isNaN(productId)) {
    return res.status(404).send({
      message: "Product not found!",
    });
  }

  const findProductId: number = dummyProducts.findIndex(
    (product) => product.id === productId
  );
  const productBody = req.body;
  if (!findProductId) {
    return res.status(404).send({
      message: "Product not found!",
    });
  }
  dummyProducts[findProductId] = {
    ...dummyProducts[findProductId],
    ...productBody,
  };
  console.log(dummyProducts[findProductId]);
  return res.send(dummyProducts[findProductId]);
});

const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});
