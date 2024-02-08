import fs from "fs";
import crypto from "crypto";

class ProductsManager {
  static #products = [];

  constructor(path) {
    this.path = path;
    this.products = [];
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(this.path)) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      console.error("Error en los productos:", error.message);
    }
  }

  async create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("Por favor, inserta título, foto, precio, stock");
      }

      const product = {
        id: ProductsManager.#products.length === 0
          ? 1
          : ProductsManager.#products[ProductsManager.#products.length - 1].id + 1,
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };

      ProductsManager.#products.push(product);
      await this.saveProductsToFile();
      return product.id;
    } catch (error) {
      return error.message;
    }
  }

  async saveProductsToFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), "utf-8");
    } catch (error) {
      console.error("Error al guardar los productos:", error.message);
    }
  }

  readProducts() {
    try {
      if (ProductsManager.#products.length === 0) {
        throw new Error("El producto no fue encontrado!");
      } else {
        return ProductsManager.#products;
      }
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      let one = ProductsManager.#products.find(each => each.id === Number(id));
      if (one) {
        return one;
      } else {
        throw new Error("Producto no encontrado con ID=" + id);
      }
    } catch (error) {
      return error.message;
    }
  }
}

const products = new ProductsManager();

export default products;