const contenedorTarjetas = document.getElementById("productos-container");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalesContainer = document.getElementById("totales");

/** Crea las tarjetas de productos teniendo en cuenta lo guardado en localstorage */

function crearProductos() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem("cervezas"));
  console.log(productos);
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      const nuevacerveza = document.createElement("div");
      nuevacerveza.classList = "tarjeta-producto";
      nuevacerveza.innerHTML = `
    <img src= ${producto.imagen}> 
    <h3>${producto.titulo}</h3>
    <span>$${producto.precio}</span>
    <div>
    <button>-</button>
    <span class="cantidad">${producto.cantidad}</span>
    <button>+</button>
    </div>
    `;
      contenedorTarjetas.appendChild(nuevacerveza);
      nuevacerveza
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = restarAlCarrito(producto);
          crearProductos();
          actualizarTotales();
        });
      nuevacerveza
        .getElementsByTagName("button")[1]
        .addEventListener("click", (e) => {
          const cantidadElement = e.target.parentElement.getElementsByClassName("cantidad")[0];
          cantidadElement.innerText = agregarAlCarrito(producto);
          actualizarTotales();
        });
    });
  }
  revisarMensajeVacio();
  actualizarTotales();
  actualizarNumeroCarrito();
}

crearProductos();

/** Actualiza el total de precio y unidades de la página del carrito */
function actualizarTotales() {
  const productos = JSON.parse(localStorage.getItem("cervezas"));
  let cantidad = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((producto) => {
      cantidad += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });
  }
  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio;
  if(precio === 0) {
    reiniciarCarrito();
    revisarMensajeVacio();
  }
}

document.getElementById("reiniciar").addEventListener("click", () => {
  contenedorTarjetas.innerHTML = "";
  reiniciarCarrito();
  revisarMensajeVacio();
});

/** Muestra o esconde el mensaje de que no hay nada en el carrito */
function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem("cervezas"));
  carritoVacioElement.classList.toggle("escondido", productos);
  totalesContainer.classList.toggle("escondido", !productos);
}