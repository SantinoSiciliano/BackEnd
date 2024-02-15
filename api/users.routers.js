import { Router } from "express";
import propsUsers from "../middlewares/propsUsers.mid.js";
import { users } from "../mongo/manager.mongo.js";
import User from "../mongo/users.model.js";

const usersRouter = Router();
const manager = users;

usersRouter.post("/", propsUsers, async (req, res, next) => {
  try {
    const data = req.body;
    const idUsuario = await users.create(data);

    return res.status(201).json({
      statusCode: 201,
      response: { _id: idUsuario },
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const { filter, order } = req.query;

    const parsedFilter = filter ? JSON.parse(filter) : {};

    const readObj = {
      filter: parsedFilter,
      order: JSON.parse(order || "{}"),
    };

    const result = await users.read(readObj);

    return res.json({
      statusCode: 200,
      response: result,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const one = await users.readOne(uid);
    if (!one) {
      return res.status(404).json({
        statusCode: 404,
        message: `Usuario con ID ${uid} no encontrado`,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      response: [one],
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.put("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const dataToUpdate = req.body;
    const updatedUser = await users.update(uid, dataToUpdate);

    if (!updatedUser) {
      const error = new Error("No se encontró el usuario");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      statusCode: 200,
      response: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
});

usersRouter.delete("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const deletedUser = await User.findByIdAndDelete(uid);

    return res.status(200).json({
      statusCode: 200,
      response: deletedUser,
    });
  } catch (error) {
    return next(error);
  }
});
usersRouter.get("/by-email/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await users.readByEmail(email);

    return res.json({
      statusCode: 200,
      response: user,
    });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;