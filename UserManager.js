const fs = require("fs");

class UserManager {
  constructor(filePath) {
    this.path = filePath;
    this.users = this.loadUsers();
  }

  generateId() {
    return this.users.length + 1;
  }

  loadUsers() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveUsers() {
    fs.writeFileSync(this.path, JSON.stringify(this.users, null, 2), "utf-8");
  }

  getUsers() {
    return this.users;
  }

  addUser({ username, email, password }) {
    if (this.users.some(user => user.email === email)) {
      throw new Error("El correo electrónico ya existe");
    }

    const newUser = {
      id: this.generateId(),
      username,
      email,
      password,
    };

    this.users.push(newUser);
    this.saveUsers();
    return newUser;
  }

  getUserById(id) {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  }

  updateUser(id, updatedFields) {
    const index = this.users.findIndex(user => user.id === id);

    if (index === -1) {
      throw new Error("Usuario no encontrado");
    }

    this.users[index] = { ...this.users[index], ...updatedFields };

    this.saveUsers();
    return this.users[index];
  }

  deleteUser(id) {
    const index = this.users.findIndex(user => user.id === id);

    if (index === -1) {
      throw new Error("Usuario no encontrado");
    }

    const deletedUser = this.users.splice(index, 1)[0];

    this.saveUsers();
    return deletedUser;
  }
}

const userManager = new UserManager("usuarios.json");

console.log("Usuarios al inicio:", userManager.getUsers());

const addedUser = userManager.addUser({
  username: "usuario1",
  email: "usuario1@email.com",
  password: "password123",
});

console.log("Usuarios tras la adición:", userManager.getUsers());

try {
  userManager.addUser({
    username: "usuario2",
    email: "usuario1@email.com",
    password: "password456",
  });
} catch (error) {
  console.error("Error al intentar agregar un usuario duplicado:", error.message);
}

const getUserById = userManager.getUserById(addedUser.id);
console.log("Obtención del usuario por id:", getUserById);

const updatedUser = userManager.updateUser(addedUser.id, {
  password: "nuevaContraseña",
});

console.log("Usuario actualizado:", updatedUser);

const deletedUser = userManager.deleteUser(addedUser.id);
console.log("Usuario eliminado:", deletedUser);