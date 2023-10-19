const contenedorTarjetas = document.getElementById('productos-container');
/** Crea las tarjetas de productos teniendo en cuenta la lista en cervezas.js */
function crearProductos(productos){
    productos.forEach(producto => {
        const nuevacerveza = document.createElement("div");
        nuevacerveza.classList = "tarjeta-producto";
        nuevacerveza.innerHTML = `
        <img src= ${producto.imagen}> 
        <h3>${producto.titulo}</h3>
        <p>${producto.precio}</p>
        <button id="boton">Agregar al carrito</button>
        `
        contenedorTarjetas.appendChild(nuevacerveza);
        nuevacerveza.getElementsByTagName('button')[0].addEventListener('click',() => agregarAlCarrito(producto))
    });
}

getcervezas().then(cervezas =>{
    crearProductos(cervezas);
})


