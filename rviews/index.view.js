import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./user.view.js";

const viewsRouter = Router();

viewsRouter.get("/home", (req, res, next) => {
  try {
    const mainProducts = [
      {
        title: "Remera",
        photo:
        "https://drops-ba.com/wp-content/uploads/2024/01/Supreme-NYC-Tee-White.jpg",
      },
      {
        title: "Buzo",
        photo:
        "https://drops-ba.com/wp-content/uploads/2024/01/Palm-Angels-London-Sprayed-Hoodie-Black-Purple.jpg",
      },
      {
        title: "Zapatilla",
        photo:
        "https://drops-ba.com/wp-content/uploads/2023/06/Nike-Hot-Step-Air-Terra-Drake-NOCTA-Triple-Black.jpg",
      },
    ];
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