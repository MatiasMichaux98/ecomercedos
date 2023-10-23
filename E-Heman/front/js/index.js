const contenedorTarjetas = document.getElementById("productos-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en bicicletas.js */
function crearTarjetasProductosInicio(productos){
  productos.forEach(producto => {
    const nuevaCerveza = document.createElement("div");
    nuevaCerveza.classList = "tarjeta-producto"
    nuevaCerveza.innerHTML = `
    <img src="${producto.imagen}">
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`
    contenedorTarjetas.appendChild(nuevaCerveza);
    nuevaCerveza.getElementsByTagName("button")[0].addEventListener("click",() => agregarAlCarrito(producto))
  });
}

getCervezas().then(cervezas => {
  crearTarjetasProductosInicio(cervezas);
})