import express from "express";
import path from "path";
import productsRouter from "./routes/products";
import productsRenderRouter from "./routes/productsRender";
import ErrorMiddleware from "./middlewares/Error";
import dotenv from "dotenv";
import NotFoundMiddleware from "./middlewares/NotFound";

const app = express();

app.use(express.json());
dotenv.config();

// Set views directory and engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    titlePage: "Home",
  });
});
app.use("/products", productsRenderRouter);
app.use("/api/products", productsRouter);

// Middlewares
app.use(NotFoundMiddleware.handle);
app.use(ErrorMiddleware.handle);

// Start server
const PORT: number = 5000;
app.listen(PORT, () => {
  console.log(`Server running at => http://localhost:${PORT}`);
});
