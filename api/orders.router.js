import { Router } from "express";
import propsOrders from "../middlewares/propsOrders.mid.js";
import order from "../fs/files/ProductManager.fs.js";
import OrderManager from "../memory/orders.memory.js";

const ordersRouter = Router();

ordersRouter.post("/", propsOrders, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await order.createOrder(data);

    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/", async (req, res, next) => {
  try {
    const allOrders = order.read();
    return res.json({
      statusCode: 200,
      response: allOrders,
    });
  } catch (error) {
    return next(error);
  }
});

ordersRouter.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const userOrder = await order.readOne(oid);

    if (userOrder) {
      return res.json({
        statusCode: 200,
        response: userOrder,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: "Pedido no encontrado",
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 404,
      message: error.message,
    });
  }
});

ordersRouter.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const response = await OrderManager.destroy(oid);

    if (response === "Pedido no encontrado") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});

ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const { quantity, state } = req.body;

    const updatedOrder = await order.update(oid, quantity, state);

    return res.json({
      statusCode: 200,
      response: updatedOrder,
    });
  } catch (error) {
    return res.json({
      statusCode: 404,
      message: error.message,
    });
  }
});

export default ordersRouter;