const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.loadProducts();
  }

  generateId() {
    
    return this.products.length + 1;
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      
      return [];
    }
  }

  saveProducts() {
    
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), "utf-8");
  }

  getProducts() {
    return this.products;
  }

  addProduct({ title, description, price, photo, code, stock }) {
    if (this.products.some(product => product.code === code)) {
      throw new Error("El código ya existe");
    }

    const newProduct = {
      id: this.generateId(),
      title,
      description,
      price,
      photo,
      code,
      stock,
    };

    this.products.push(newProduct);
    this.saveProducts(); 
    return newProduct;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      throw new Error("No se encuentra el producto");
    }

    return product;
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex(product => product.id === id);

    if (index === -1) {
      throw new Error("No se encuentra el producto");
    }

    
    this.products[index] = { ...this.products[index], ...updatedFields };

    this.saveProducts(); 
    return this.products[index];
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);

    if (index === -1) {
      throw new Error("No se encuentra el producto");
    }

   
    const deletedProduct = this.products.splice(index, 1)[0];

    this.saveProducts(); 
    return deletedProduct;
  }
}


const productManager = new ProductManager("productos.json");

console.log("Productos al inicio:", productManager.getProducts());

const addedProduct = productManager.addProduct({
  title: "producto",
  description: "producto ",
  price: 300,
  photo: "Sin photo",
  code: "abc123",
  stock: 30,
});

console.log("productos tras la adición:", productManager.getProducts());

try {
  productManager.addProduct({
    title: "producto",
    description: "producto",
    price: 300,
    photo: "Sin photo",
    code: "abc123",
    stock: 30,
  });
} catch (error) {
  console.error("Error al intentar agregar un producto duplicado:", error.message);
}

const getProductById = productManager.getProductById(addedProduct.id);
console.log("Obtencion del producto por id:", getProductById);


const updatedProduct = productManager.updateProduct(addedProduct.id, {
  price: 250,
  stock: 30,
});

console.log("Producto actualizado:", updatedProduct);


const deletedProduct = productManager.deleteProduct(addedProduct.id);
console.log("Producto eliminado:", deletedProduct);