import { Router } from "express";
import Order from "../../data/mongo/models/orders.model.js"; 

const ordersRouter = Router();

ordersRouter.get("/", async (req, res, next) => {
  try {
    const { filter } = req.query;
    const parsedFilter = filter ? JSON.parse(filter) : {};

    const order = await Order.findOne(parsedFilter);

    if (!order) {
      return res.status(404).json({
        statusCode: 404,
        message: "La orden de compra no fue encontrada",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      order: order,
    });
  } catch (error) {
    next(error);
  }
});

export default ordersRouter;