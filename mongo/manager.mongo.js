import User from "./users.model.js";
import Product from "./products.model.js";
import Order from "./orders.model.js";
import notFoundOne from "../utils/notFoundOne.utils.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one._id;
    } catch (error) {
      throw error;
    }
  }
  async read(obj) {
    try {
      let { filter, order } = obj;
      const all = await this.model.find(filter).sort(order).exec();
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      notFoundOne(this.model, one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const deletedItem = await this.model.findByIdAndDelete(id);
      if (!deletedItem) {
        const error = new Error(`${this.model.modelName} no encontrado`);
        error.statusCode = 404;
        throw error;
      }
      return deletedItem;
    } catch (error) {
      throw error;
    }
  }
  async readByEmail(email) {
    try {
      const user = await this.model.findOne({ email });

      if (!user) {
        const error = new Error(`Usuario con correo electrónico ${email} no encontrado`);
        error.statusCode = 404;
        throw error;
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
const users = new MongoManager(User);
const products = new MongoManager(Product);
const orders = new MongoManager(Order);

export { users, products, orders };