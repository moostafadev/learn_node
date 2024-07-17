import express from "express";
import path from "path";
import productsRouter from "./routes/products";
import productsRenderRouter from "./routes/productsRender";

const app = express();

app.use(express.json());

// Set views directory and engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/products", productsRenderRouter);
app.use("/api/products", productsRouter);

app.get("/", (req, res) => {
  res.render("index", {
    titlePage: "Home",
  });
});
app.get("*", (req, res) => {
  res.render("notFound", {
    titlePage: "Not found",
  });
});

const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});
