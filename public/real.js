const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  socket.on("products", (updatedProducts) => {
    renderProducts(updatedProducts);
  });
});

function renderProducts(products) {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

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