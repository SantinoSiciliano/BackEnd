import { Router } from "express";
import products from "../fs/files/ProductManager.fs.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const all = await products.readProducts();
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