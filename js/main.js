//MENU HAMBURGUIESA
const toggleProductos = document.getElementById("toggle-productos");
const contenedorTarjetas = document.getElementById("productos-contenedor");

// Alternar visibilidad del catálogo al hacer clic en el título hamburguesa
toggleProductos.addEventListener("click", () => {
  contenedorTarjetas.classList.toggle("active");
});

// Crea las tarjetas de productos teniendo en cuenta la lista en perfunes.js
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

//BUSCADOR DE PRODUCTOS
document.addEventListener("DOMContentLoaded", () => {
  const inputBuscar = document.getElementById("buscar");
  const btnBuscar = document.getElementById("btnBuscar");
  const productos = document.querySelectorAll(".tarjeta-producto");

  //Funcino para filtrar productos
  function filtrarProductos() {
    const texto = inputBuscar.value.toLowerCase().trim();
    productos.forEach((producto) => {
      const nombre = producto.querySelector("h3").textContent.toLowerCase();

      //Muestra solo los productos que coinciden
      if (nombre.includes(texto)) {
        producto.style.display = "block";
      } else {
        producto.style.display = "none";
      }
    });
  }

  //Evento al hacer click en el boton
  btnBuscar.addEventListener("click", filtrarProductos);

  //Tambien permite buscar con ENTER
  inputBuscar.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      filtrarProductos();
    }
  });

  //Bucar en tiempo real
  inputBuscar.addEventListener("input", filtrarProductos);
});

/* //CARRUSEL
const carrusel = document.querySelector(".carrusel");

// Lista de imágenes que están en img/marcas
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

//Crear contenedor interno (track)
const track = document.createElement("div");
track.classList.add("carrusel-track");

//Agregar imagenes al track
imagenes.forEach((img) => {
  const imagen = document.createElement("img");
  imagen.src = `./img/marcas/${img}`;
  imagen.alt = img;
  track.appendChild(imagen);
});

imagenes.forEach((img) => {
  const imagen = document.createElement("img");
  imagen.src = `./img/marcas/${img}`;
  imagen.alt = img;
  track.appendChild(imagen);
});

imagenes.forEach((img) => {
  const imagen = document.createElement("img");
  imagen.src = `./img/marcas/${img}`;
  imagen.alt = img;
  track.appendChild(imagen);
});

carrusel.appendChild(track); */

//CARRUSEL
const carrusel = document.querySelector(".carrusel");

// Lista de imágenes que están en img/marcas
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
// Crear el track
const track = document.createElement("div");
track.classList.add("carrusel-track");

// Duplicar imágenes una vez para lograr efecto loop
const listaCompleta = [...imagenes, ...imagenes];

listaCompleta.forEach((img) => {
  const imagen = document.createElement("img");
  imagen.src = `./img/marcas/${img}`;
  imagen.alt = img;
  track.appendChild(imagen);
});

carrusel.appendChild(track);

// Animación infinita con JS
let posicion = 0;
const velocidad = 0.5; // Ajuste de velocidad

function animarCarrusel() {
  posicion -= velocidad;
  const anchoTotal = track.scrollWidth / 2;

  // Si se llega al final de la primera tanda de imágenes, vuelve al inicio
  if (Math.abs(posicion) >= anchoTotal) {
    posicion = 0;
  }

  track.style.transform = `translateX(${posicion}px)`;
  requestAnimationFrame(animarCarrusel);
}

animarCarrusel();
