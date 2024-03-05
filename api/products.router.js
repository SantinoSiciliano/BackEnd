import { Router } from "express";
import { products } from "../mongo/manager.mongo.js";
import propsProducts from "../middlewares/propsProducts.mid.js";

const productsRouter = Router();

productsRouter.post("/", propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await products.create(data);
    if (response === "Title, photo, price & stock are required") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        response,
      });
    }
  } catch (error) {
    return next(error);
  }
});
productsRouter.get("/", async (req, res, next) => {
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

    const all = await products.read(readObj);

    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await products.readOne(pid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: one,
      });
    }
  } catch (error) {
    return next(error);
  }
});
productsRouter.put("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const dataToUpdate = req.body;
    const updatedProduct = await products.update(pid, dataToUpdate);

    if (!updatedProduct) {
      const error = new Error("No se encontró el producto");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      statusCode: 200,
      response: updatedProduct,
    });
  } catch (error) {
    return next(error);
  }
});
productsRouter.delete("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await products.destroy(pid);

    return res.status(200).json({
      statusCode: 200,
      response: deletedProduct,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;