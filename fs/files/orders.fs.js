import fs from "fs";
import crypto from "crypto";

class OrderManager {
  #orders = [];
  #path;

  constructor(path) {
    this.#path = path;
    this.#orders = [];
    this.initialize().then(() => {
      console.log("Inicialización completa.");
    });
  }

  async initialize() {
    try {
      const exists = fs.existsSync(this.#path);
      if (!exists) {
        const initialData = JSON.stringify([], null, 2);
        fs.writeFileSync(this.#path, initialData);
      } else {
        this.#orders = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
      }
    } catch (error) {
      throw new Error(`Error al inicializar OrderManager: ${error.message}`);
    }
  }

  generateId() {
    return crypto.randomBytes(16).toString("hex");
  }

  async createOrder(data) {
    try {
      const { uid, pid, quantity } = data;

      if (!uid || !pid || !quantity) {
        throw new Error("Se requieren uid, pid y cantidad");
      }

      const nextId = this.generateId();

      const order = {
        id: nextId,
        uid: uid,
        pid: pid,
        quantity: quantity,
        state: "reservado",
      };

      this.#orders.push(order);
      const jsonData = JSON.stringify(this.#orders, null, 2);
      await fs.promises.writeFile(this.#path, jsonData);
      return order.id;
    } catch (error) {
      throw new Error(`Error al crear la orden: ${error.message}`);
    }
  }

  read() {
    return this.#orders;
  }

  readOne(oid) {
    console.log("Buscando orden con ID:", oid);
    const foundOrder = this.#orders.find((order) => order.id === oid);

    if (foundOrder) {
      return foundOrder;
    } else {
      console.log("Orden no encontrada");
      throw new Error("Orden no encontrada");
    }
  }

  async update(oid, quantity, state) {
    try {
      console.log("Se recibió el ID de orden:", oid);

      const orderIndex = this.#orders.findIndex((order) => order.id === oid);
      if (orderIndex === -1) {
        throw new Error("Orden no encontrada");
      }

      if (quantity !== undefined) {
        this.#orders[orderIndex].quantity = quantity;
      }

      if (state !== undefined) {
        this.#orders[orderIndex].state = state;
      }

      const jsonData = JSON.stringify(this.#orders, null, 2);
      await fs.promises.writeFile(this.#path, jsonData);
      return this.#orders[orderIndex];
    } catch (error) {
      throw new Error(`Error al actualizar la orden: ${error.message}`);
    }
  }

  async removeOrder(oid) {
    try {
      const orderIndex = this.#orders.findIndex((order) => order.id === oid);
      if (orderIndex === -1) {
        throw new Error("Orden no encontrada");
      }

      this.#orders.splice(orderIndex, 1);
      const jsonData = JSON.stringify(this.#orders, null, 2);
      await fs.promises.writeFile(this.#path, jsonData);
      return oid;
    } catch (error) {
      throw new Error(`Error al eliminar la orden: ${error.message}`);
    }
  }
}

const orderManager = new OrderManager("./orders.json");
await orderManager.initialize();

export default orderManager;