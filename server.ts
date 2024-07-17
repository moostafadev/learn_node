import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import compression from "compression";
import path from "path";
import productsRouter from "./routes/products";
import productsRenderRouter from "./routes/productsRender";
import ErrorMiddleware from "./middlewares/Error";
import dotenv from "dotenv";
import NotFoundMiddleware from "./middlewares/NotFound";

const app = express();

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
    xFrameOptions: {
      action: "deny",
    },
  })
);
app.use(compression());
app.use(morgan("dev"));
app.use(limiter);

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
