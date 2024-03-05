import { Router } from "express";
import Product from "../mongo/products.model";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await Product.find();
    return res.render("products", { products: all });
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/form", (req, res, next) => {
  try {
    return res.render("form");
  } catch (error) {
    next(error);
  }
});

export default productsRouter;