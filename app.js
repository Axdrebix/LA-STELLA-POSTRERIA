// Número telefónico oficial de La Stella Postrería con código internacional (Venezuela: +58)
const NUMERO_WHATSAPP = "584147614025";

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
        "<p style='text-align:center;'>Ocurrió un error al cargar el catálogo de postres.</p>";
    });
}

function renderizarProductos(productos) {
  const contenedorGrid = document.getElementById("grid-productos");
  contenedorGrid.innerHTML = "";

  productos.forEach((producto) => {
    // Mensaje automático personalizado para pedidos dirigidos a Luz
    const mensajeWA = encodeURIComponent(
      `¡Hola, Luz! Me gustaría encargar el siguiente postre de La Stella: ${producto.nombre} ($${producto.precio.toFixed(2)})`
    );
    const urlWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensajeWA}`;

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("card");

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/300x180?text=La+Stella+Postre'">
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