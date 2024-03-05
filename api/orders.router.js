import mongoose from "mongoose";
import { Router } from "express";
//import propsOrders from "../middlewares/propsOrders.mid.j";
import { orders } from "../mongo/manager.mongo.js";

const ordersRouter = Router();

ordersRouter.post("/", async (req, res, next) => {
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
    const { filter, sortAndPaginate } = req.query;
    const parsedFilter = filter ? JSON.parse(filter) : {};
    const parsedSortAndPaginate = sortAndPaginate
      ? JSON.parse(sortAndPaginate)
      : {};

    const readObj = {
      filter: parsedFilter,
      sortAndPaginate: parsedSortAndPaginate,
    };

    const allOrders = await orders.read(readObj);

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
    const one = await orders.destroy(oid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});
ordersRouter.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const data = req.body;
    const one = await orders.update(oid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(Error);
  }
});
ordersRouter.get("/total/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;

    console.log("Valor de uid:", uid);

    if (!mongoose.Types.ObjectId.isValid(uid)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid ObjectId format for user ID",
      });
    }

   
    const totalAmount = await orders.report(uid);

    return res.json({
      statusCode: 200,
      response: {
        userId: uid,
        totalAmount: totalAmount,
      },
    });
  } catch (error) {
    return next(error);
  }
});

export default ordersRouter;