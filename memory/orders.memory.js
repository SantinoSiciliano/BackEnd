class OrderManager {
    static #orders = [];
    static #nextId = 1;
  
    static createOrder(data) {
      try {
        if (!data.uid || !data.pid || !data.quantity) {
          throw new Error("uid, pid y cantidad son requeridos");
        }
  
        const order = {
          id: OrderManager.#nextId++,
          uid: data.uid,
          pid: data.pid,
          quantity: data.quantity,
          state: "reserved",
        };
  
        OrderManager.#orders.push(order);
        return order.id;
      } catch (error) {
        throw new Error(`Falló al crear la orden: ${error.message}`);
      }
    }
  
    static read() {
      return OrderManager.#orders;
    }
  
    static readOne(uid) {
      return OrderManager.#orders.filter((order) => order.uid === uid);
    }
  
    static update(oid, quantity, state) {
      try {
        console.log("ID de orden recibido:", oid);
        const order = OrderManager.#orders.find((order) => order.id === oid);
        if (!order) {
          throw new Error("Orden no encontrada");
        }
  
        if (quantity !== undefined) {
          order.quantity = quantity;
        }
  
        if (state !== undefined) {
          order.state = state;
        }
        console.log("Orden actualizada:", order);
        return order;
      } catch (error) {
        throw new Error(`Falló al actualizar la orden: ${error.message}`);
      }
    }
  
    static destroy(oid) {
      try {
        console.log("Intentando eliminar la orden con ID:", oid);
        const index = OrderManager.#orders.findIndex(
          (order) => order.id === parseInt(oid)
        );
        if (index === -1) {
          throw new Error("Orden no encontrada");
        }
  
        OrderManager.#orders.splice(index, 1);
        return oid;
      } catch (error) {
        throw new Error(`Falló al eliminar la orden: ${error.message}`);
      }
    }
  }
  
  export default OrderManager;