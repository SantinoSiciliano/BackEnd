import { Router } from "express";
import apiRouter from "./api/index.router.js";
import viewsRouter from "./rviews/index.view.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/", viewsRouter);

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/real", (req, res) => {
  res.render("real");
});

router.get("/form", (req, res) => {
  res.render("form");
});

router.get("/register", (req, res) => {
  res.render("register");
});

export default router;