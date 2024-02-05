import fs from "fs";
import crypto from "crypto";

class UsersManager {
  static #users = [];

  constructor(path) {
    this.path = path;
    this.users = [];
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(this.path)) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        this.users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      console.error("Error initializing users:", error.message);
    }
  }

  async create(data) {
    try {
      if (!data.name || !data.email) {
        throw new Error("Please, insert name & email");
      }

      const user = {
        id: UsersManager.#users.length === 0
          ? 1
          : UsersManager.#users[UsersManager.#users.length - 1].id + 1,
        name: data.name,
        photo: data.photo,
        email: data.email,
      };

      UsersManager.#users.push(user);
      await this.saveUsersToFile();
      return user.id;
    } catch (error) {
      return error.message;
    }
  }

  async saveUsersToFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.users, null, 2), "utf-8");
    } catch (error) {
      console.error("Error saving users to file:", error.message);
    }
  }

  readUsers() {
    try {
      if (UsersManager.#users.length === 0) {
        throw new Error("Not found users!");
      } else {
        return UsersManager.#users;
      }
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      if (!id) {
        throw new Error("Please provide an ID");
      }

      const user = UsersManager.#users.find((each) => each.id === Number(id));

      if (user) {
        return user;
      } else {
        throw new Error("Not found user with id=" + id);
      }
    } catch (error) {
      return error.message;
    }
  }
}

const users = new UsersManager();

export default users;