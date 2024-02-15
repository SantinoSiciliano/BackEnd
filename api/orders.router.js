import mongoose from "mongoose";
import { Router } from "express";
import propsOrders from "../middlewares/propsOrders.mid.j";
import { orders } from "../mongo/manager.mongo.js";

const ordersRouter = Router();

ordersRouter.post("/", propsOrders, async (req, res, next) => {
  try {
    const data = req.body;

    const response = await orders.create(data);

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
    let filter = {};
    if (req.query.user_id) {
      filter = { user_id: req.query.user_id };
    }
    const allOrders = await orders.read({ filter });
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
    const one = await orders.readOne(oid);

    return res.json({
      statusCode: 200,
      response: one,
    });
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
    const response = await orders.destroy(oid);

    if (response === "Order not found") {
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

    const updatedOrder = await orders.update(oid, quantity, state);

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