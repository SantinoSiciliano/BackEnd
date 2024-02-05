import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = this.loadProducts();
  }

  generateId() {
    return crypto.randomBytes(12).toString("hex");
  }

  loadProducts() {
    try {
      const exists = fs.existsSync(this.path);
      console.log(exists);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        const data = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(data);
        console.log(this.products);
      }
    } catch (error) {
      return error.message;
    }
  }

  saveProducts() {
    const jsonData = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, jsonData, "utf-8");
  }

  createProduct(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("El título, la foto, el precio y el stock son obligatorios");
      }

      const product = {
        id: this.generateId(),
        title: data.title,
        photo: data.photo,
        price: data.price || 10,
        stock: data.stock || 25,
      };

      this.products.push(product);
      this.saveProducts();
      console.log("Producto creado con id " + product.id);
      return product.id;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readProducts() {
    try {
      if (this.products.length === 0) {
        throw new Error("No hay productos disponibles");
      } else {
        console.log(this.products);
        return this.products;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readProductById(id) {
    try {
      const one = this.products.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay ningún producto con id=" + id);
      } else {
        console.log("Leído producto con id " + one.id);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  removeProductById(id) {
    try {
      let one = this.products.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay ningún producto con id=" + id);
      } else {
        this.products = this.products.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, jsonData);
        console.log("Eliminado producto con id " + id);
        return id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const products = new ProductManager("./products.json");
export default products;