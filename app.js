// Número telefónico general para hacer pedidos
const NUMERO_WHATSAPP = "584120000000"; // Reemplazar con el número real

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});

function cargarProductos() {
  fetch("data/productos.json")
    .then((respuesta) => {
      if (!respuesta.ok) {
        throw new Error("No se pudo cargar la lista de productos.");
      }
      return respuesta.json();
    })
    .then((productos) => {
      renderizarProductos(productos);
    })
    .catch((error) => {
      console.error("Error al cargar productos:", error);
      document.getElementById("grid-productos").innerHTML = 
        "<p>Ocurrió un error al cargar el catálogo de postres.</p>";
    });
}

function renderizarProductos(productos) {
  const contenedorGrid = document.getElementById("grid-productos");
  contenedorGrid.innerHTML = "";

  productos.forEach((producto) => {
    // Generar mensaje dinámico para encargar el producto específico
    const mensajeWA = encodeURIComponent(
      `¡Hola! Me gustaría hacer un pedido de: ${producto.nombre} ($${producto.precio.toFixed(2)})`
    );
    const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeWA}`;

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("card");

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/300x180?text=Postre'">
      <div class="card-content">
        <div>
          <h3 class="card-title">${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
        </div>
        <div>
          <p class="card-precio">$${producto.precio.toFixed(2)}</p>
          <a href="${urlWhatsApp}" target="_blank" class="btn-whatsapp">
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    `;

    contenedorGrid.appendChild(tarjeta);
  });
}