const contenedorTarjetas = document.getElementById("productos-contenedor");

/** Crea las tarjetas de productos teniendo en cuenta la lista en perfunes.js */
function crearTarjetas(productos) {
  productos.forEach((producto) => {
    const nuevoPerfume = document.createElement("div");
    nuevoPerfume.classList = "tarjeta-producto";
    nuevoPerfume.innerHTML = `
    <img src="./img/${producto.id}.png" alt="Perfume 1">
    <h3>${producto.nombre}</h3>
    <p class="precio">$${producto.precio}</p>
    <button>Agregar al carrito</button>`;
    contenedorTarjetas.appendChild(nuevoPerfume);
    nuevoPerfume
      .getElementsByTagName("button")[0]
      .addEventListener("click", () => agregarAlCarrito(producto));
  });
}

crearTarjetas(perfumes);
