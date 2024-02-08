import { Router } from "express";
import users from "../fs/files/UserManager.fs.js";
const usersRouter = Router();

usersRouter.use("/register", (req, res, next) => {
  try {
    const one = users.readUserById("7d2b532239f1cabade67c7fe");
    console.log(one);
    return res.render("profile", { one });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;