import "dotenv/config.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import dbConnection from "./src/utils/db.js";
import Product from "./mongo/products.model.js"
import router from "./api/index.router.js";
import errorHandler from "./middlewares/errorHandler.mid";
import pathHandler from "./middlewares/pathHandler.mid";
import propsProducts from "./middlewares/propsProducts.mid.js";
import propsUsers from "./middlewares/propsUsers.mid.js";
import propsOrders from "./middlewares/propsOrders.mid.js";
import __dirname from "./utils.js";

const app = express();
const PORT = 8080;
const ready = () => {
  console.log("Server ready on port " + PORT);
};

dbConnection();

const httpServer = createServer(app);
const io = new Server(httpServer);

httpServer.listen(PORT, ready);

app.engine("handlebars", engine({ extname: ".handlebars" }));
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");

app.use((req, res, next) => {
  res.locals.isHome = req.path === "/home";
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(express.static("public"));

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  res.send(`User registered: ${username}`);
});

app.use("/", router);

app.use(errorHandler);

app.use(pathHandler);

app.use(propsProducts);

app.use(propsUsers);

app.use(propsOrders);

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);
  socket.emit("welcome", "Welcome to my App!");

  Product.find({})
    .then((products) => {
      socket.emit("products", products);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });

  socket.on("newProduct", async (data) => {
    try {
      await Product.create(data);
      Product.find({}, (err, updatedProducts) => {
        if (err) {
          console.error("Error fetching updated products:", err);
        } else {
          socket.emit("products", updatedProducts);
        }
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  });
});