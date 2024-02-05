
import fs from "fs";
import crypto from "crypto";

class UsersManager {
  constructor(path) {
    this.path = path;
    this.users = this.loadUsers();
  }

  generateId() {
    return crypto.randomBytes(12).toString("hex");
  }

  loadUsers() {
    try {
      const exists = fs.existsSync(this.path);
      console.log(exists);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        const data = fs.readFileSync(this.path, "utf-8");
        this.users = JSON.parse(data);
        console.log(this.users);
      }
    } catch (error) {
      return error.message;
    }
  }

  saveUsers() {
    const jsonData = JSON.stringify(this.users, null, 2);
    fs.writeFileSync(this.path, jsonData, "utf-8");
  }

  createUser(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("Nombre, foto, correo electrónico son obligatorios");
      }
      const user = {
        id: this.generateId(),
        name: data.name,
        photo: data.photo,
        email: data.email,
      };
      this.users.push(user);
      this.saveUsers();
      console.log("Usuario creado con id " + user.id);
      return user.id;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readUsers() {
    try {
      if (this.users.length === 0) {
        throw new Error("No hay usuarios disponibles");
      } else {
        console.log(this.users);
        return this.users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  readUserById(id) {
    try {
      const one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay ningún usuario con id=" + id);
      } else {
        console.log("Leído usuario con id " + one.id);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  removeUserById(id) {
    try {
      let one = this.users.find((each) => each.id === id);
      if (!one) {
        throw new Error("No hay ningún usuario con id=" + id);
      } else {
        this.users = this.users.filter((each) => each.id !== id);
        this.saveUsers();
        console.log("Eliminado usuario con id " + id);
        return id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const users = new UsersManager("./users.json");
export default users;