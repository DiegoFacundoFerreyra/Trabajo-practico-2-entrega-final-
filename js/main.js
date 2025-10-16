// MENU HAMBURGUESA
const toggleProductos = document.getElementById("toggle-productos");
const contenedorTarjetas = document.getElementById("productos-contenedor");

// Alternar visibilidad del catálogo al hacer clic en el título hamburguesa
toggleProductos.addEventListener("click", () => {
  contenedorTarjetas.classList.toggle("active");
});

// Crea las tarjetas de productos
function crearTarjetas(productos) {
  productos.forEach((producto) => {
    const nuevoPerfume = document.createElement("div");
    nuevoPerfume.classList = "tarjeta-producto";
    nuevoPerfume.innerHTML = `
      <img src="./img/${producto.id}.png" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p class="precio">$${producto.precio}</p>
      <button>Agregar al carrito</button>
    `;
    contenedorTarjetas.appendChild(nuevoPerfume);

    nuevoPerfume
      .getElementsByTagName("button")[0]
      .addEventListener("click", () => agregarAlCarrito(producto));
  });
}

//  Cargar perfumes desde el archivo JSON
fetch("./perfumes.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    return response.json();
  })
  .then((data) => {
    crearTarjetas(data); // generamos las tarjetas
  })
  .catch((error) => {
    console.error("Error al obtener perfumes:", error);
  });

// BUSCADOR DE PRODUCTOS
document.addEventListener("DOMContentLoaded", () => {
  const inputBuscar = document.getElementById("buscar");
  const btnBuscar = document.getElementById("btnBuscar");

  //Función para filtrar productos
  function filtrarProductos() {
    const texto = inputBuscar.value.toLowerCase().trim();
    const productos = document.querySelectorAll(".tarjeta-producto");
    productos.forEach((producto) => {
      const nombre = producto.querySelector("h3").textContent.toLowerCase();
      producto.style.display = nombre.includes(texto) ? "block" : "none";
    });
  }

  btnBuscar.addEventListener("click", filtrarProductos);
  inputBuscar.addEventListener("keyup", (e) => {
    if (e.key === "Enter") filtrarProductos();
  });
  inputBuscar.addEventListener("input", filtrarProductos);
});

// CARRUSEL
const carrusel = document.querySelector(".carrusel");
const imagenes = [
  "calvin.png",
  "carolina.png",
  "chanel.png",
  "d&g.png",
  "dior.png",
  "giorgio.png",
  "givenchy.png",
  "paco.png",
];

const track = document.createElement("div");
track.classList.add("carrusel-track");
const listaCompleta = [...imagenes, ...imagenes];

listaCompleta.forEach((img) => {
  const imagen = document.createElement("img");
  imagen.src = `./img/marcas/${img}`;
  imagen.alt = img;
  track.appendChild(imagen);
});

carrusel.appendChild(track);

let posicion = 0;
const velocidad = 0.5;

function animarCarrusel() {
  posicion -= velocidad;
  const anchoTotal = track.scrollWidth / 2;
  if (Math.abs(posicion) >= anchoTotal) {
    posicion = 0;
  }
  track.style.transform = `translateX(${posicion}px)`;
  requestAnimationFrame(animarCarrusel);
}

animarCarrusel();
