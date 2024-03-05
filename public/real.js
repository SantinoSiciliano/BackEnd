document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error("Error al obtener los productos");
    }
    const products = await response.json();
    console.log("Productos recibidos:", products);

    renderProducts(products);
  } catch (error) {
    console.error(error);
  }
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

function searchProducts() {
  const searchTerm = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();

  const allProducts = document.querySelectorAll(".card");

  allProducts.forEach((product) => {
    const title = product
      .querySelector(".card-title")
      .innerText.trim()
      .toLowerCase();
    const description = product
      .querySelector(".card-text")
      .innerText.trim()
      .toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}