import { Router } from "express";

const realRouter = Router();

realRouter.get("/", (req, res) => {
  res.render("real");
});

export default realRouter;