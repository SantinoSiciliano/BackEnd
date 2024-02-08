import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./user.view.js";

const viewsRouter = Router();

viewsRouter.get("/home", (req, res, next) => {
  try {
    const mainProducts = ["Remera", "Buzo", "Zapatilla"];
    const date = new Date();
    return res.render("home", {
      products: mainProducts,
      date,
      title: "INDEX",
    });
  } catch (error) {
    next(error);
  }
});
viewsRouter.use("/real", productsRouter);
viewsRouter.use("/users", usersRouter);

export default viewsRouter;