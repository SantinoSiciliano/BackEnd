import express from "express";
import router from "./api/index.router.js";
import errorHandler from "./middlewares/errorHandler.mid";
import pathHandler from "./middlewares/pathHandler.mid";
import propsProducts from "./middlewares/propsProducts.mid.js";
import propsUsers from "./middlewares/propsUsers.mid.js";
import propsOrders from "./middlewares/propsOrders.mid.js";
import __dirname from "./utils.js";
import morgan from "morgan";

const server = express();
const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

server.listen(PORT, ready);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
server.use(propsProducts);
server.use(propsUsers);
server.use(propsOrders);