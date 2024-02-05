import express from "express";
import productsManager from "./ProductManager.fs.js";
import usersManager from "./UsersManager.fs.js";

const server = express();
const PORT = 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
});

// Rutas para productos
server.post("/api/products", async (req, res) => {
  try {
    const data = req.body;
    const response = await productsManager.createProduct(data);

    if (typeof response === "string" && response.includes("requerido")) {
      res.status(400).json({
        statusCode: 400,
        mensaje: response,
      });
    } else {
      res.status(201).json({
        statusCode: 201,
        mensaje: "Producto creado exitosamente",
        response,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      mensaje: "¡Algo salió mal!",
    });
  }
});

server.get("/api/products", async (req, res) => {
  try {
    const allProducts = await productsManager.readProducts();

    if (Array.isArray(allProducts) && allProducts.length > 0) {
      res.status(200).json({
        statusCode: 200,
        productos: allProducts,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        mensaje: "¡No se encontraron productos!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      mensaje: "¡Algo salió mal!",
    });
  }
});

server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const producto = await productsManager.readProductById(pid);

    if (typeof producto === "string") {
      res.status(404).json({
        statusCode: 404,
        mensaje: "¡Producto no encontrado!",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        producto,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      mensaje: "¡Algo salió mal!",
    });
  }
});

// Rutas para usuarios
server.post("/api/users", async (req, res) => {
  try {
    const data = req.body;
    const response = await usersManager.createUser(data);

    if (typeof response === "string" && response.includes("requerido")) {
      res.status(400).json({
        statusCode: 400,
        mensaje: response,
      });
    } else {
      res.status(201).json({
        statusCode: 201,
        mensaje: "Usuario creado exitosamente",
        response,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      mensaje: "¡Algo salió mal!",
    });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const allUsers = await usersManager.readUsers();

    if (Array.isArray(allUsers) && allUsers.length > 0) {
      res.status(200).json({
        statusCode: 200,
        usuarios: allUsers,
      });
    } else {
      res.status(404).json({
        statusCode: 404,
        mensaje: "¡No se encontraron usuarios!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      mensaje: "¡Algo salió mal!",
    });
  }
});

server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const usuario = await usersManager.readUserById(uid);

    if (typeof usuario === "string") {
      res.status(404).json({
        statusCode: 404,
        mensaje: "¡Usuario no encontrado!",
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        usuario,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      mensaje: "¡Algo salió mal!",
    });
  }
});