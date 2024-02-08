const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const newProductButton = document.getElementById("newProduct");

  newProductButton.addEventListener("click", () => {
    console.log('Botón "CREATE!" clickeado');
    const title = document.getElementById("title").value;
    const photo = document.getElementById("photo").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;

    console.log("Datos del formulario:", { title, photo, price, stock });

    if (!title || !photo || !price || !stock) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Crea objeto de producto
    const newProduct = {
      title,
      photo,
      price: parseFloat(price),
      stock: parseInt(stock),
    };

    // Emitir el evento "new product" al servidor
    socket.emit("newProduct", newProduct);

    // Limpiar el formulario
    document.getElementById("title").value = "";
    document.getElementById("photo").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
  });

  socket.on("products", (updatedProducts) => {
    renderProducts(updatedProducts);
  });
});

function renderProducts(products) {
  const productsContainer = document.getElementById("products");

  // Limpiar el contenido del contenedor
  productsContainer.innerHTML = "";

  // Iterar sobre la lista de productos y agregarlos al contenedor
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${product.photo}" alt="${product.title}">
      <p>Precio: $${product.price}</p>
      <p>Stock: ${product.stock}</p>
    `;
    productsContainer.appendChild(productElement);
  });
}