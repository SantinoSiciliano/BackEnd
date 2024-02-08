import { Router } from "express";
import userData from "./fs/UserManager.fs.js";
import userProps from "../middlewares/propsUsers.mid.js";

const userRoutes = Router();

userRoutes.post("/", userProps, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await userData.createUser(data);
    if (response === "Título, foto, precio y stock son requeridos") {
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

userRoutes.get("/", async (req, res, next) => {
  try {
    const allUsers = await userData.readUsers();
    if (Array.isArray(allUsers)) {
      return res.json({
        statusCode: 200,
        response: allUsers,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: allUsers,
      });
    }
  } catch (error) {
    return next(error);
  }
});

userRoutes.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const user = await userData.readUserById(uid);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: `Usuario con ID ${uid} no encontrado`,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      response: [user],
    });
  } catch (error) {
    return next(error);
  }
});

export default userRoutes;