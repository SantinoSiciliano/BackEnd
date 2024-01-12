const express = require('express');
const ProductManager = require('../ProductManager');
const app = express();
const port = 8080;

const productManagerInstance = new ProductManager("products.json");

app.use(express.json());

app.get('/products', (req, res) => {
  try {
    const { limit } = req.query;
    const products = productManagerInstance.getProducts().slice(0, limit && parseInt(limit));
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = productManagerInstance.getProductById(productId);
    res.json({ product });
  } catch (error) {
    res.status(404).json({ error: "No se encontro el producto" });
  }
});

app.listen(port, () => {
  console.log(`Server http://localhost:${port}`);
});