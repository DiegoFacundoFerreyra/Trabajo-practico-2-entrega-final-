const contenedorTarjetas = document.getElementById("contenedor-carrito");
const cantidadElement = document.getElementById("cantidad");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const totalContenedor = document.getElementById("total");

function crearTarjetas() {
  contenedorTarjetas.innerHTML = "";
  const productos = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];

  if (productos.length > 0) {
    productos.forEach((producto) => {
      const nuevo = document.createElement("div");
      nuevo.classList.add("tarjeta-producto");
      nuevo.innerHTML = `
        <img src="../img/${producto.id}.png" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>Precio: $${producto.precio.toLocaleString()}</p>
        <p>Cantidad: <span class="cantidad">${producto.cantidad}</span></p>
        <div class="botones-carrito">
          <button class="restar">-</button>
          <button class="sumar">+</button>
        </div>
      `;
      contenedorTarjetas.appendChild(nuevo);

      nuevo.querySelector(".restar").addEventListener("click", () => {
        restarAlCarrito(producto);
        crearTarjetas();
        actualizarTotal();
      });

      nuevo.querySelector(".sumar").addEventListener("click", () => {
        agregarAlCarrito(producto);
        crearTarjetas();
        actualizarTotal();
      });
    });
  }

  revisarMensajeVacio();
  actualizarTotal();
  actualizarNumeroCarrito();
}

crearTarjetas();

function actualizarTotal() {
  const productos = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];
  let cantidad = 0;
  let precio = 0;

  productos.forEach((p) => {
    cantidad += p.cantidad;
    precio += p.precio * p.cantidad;
  });

  cantidadElement.innerText = cantidad;
  precioElement.innerText = precio.toLocaleString();

  if (productos.length === 0) {
    reiniciarCarrito();
    revisarMensajeVacio();
  }
}

//Reiniciar carrito con alerta de seguridad

const btnReiniciar = document.getElementById("reiniciar");

btnReiniciar.addEventListener("click", () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Se eliminarán todos los productos del carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      reiniciarCarrito();
      crearTarjetas();
      revisarMensajeVacio();

      Swal.fire({
        title: "Carrito eliminado",
        text: "Tu carrito fue vaciado correctamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
});

function revisarMensajeVacio() {
  const productos = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];
  const vacio = productos.length === 0;
  carritoVacioElement.classList.toggle("escondido", !vacio);
  totalContenedor.classList.toggle("escondido", vacio);
}

const botonComprar = document.getElementById("boton-comprar");

if (botonComprar) {
  botonComprar.addEventListener("click", () => {
    const productos = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];

    if (productos.length === 0) {
      alert("Tu carrito está vacío 🛒");
      return;
    }

    // Vaciar carrito
    localStorage.removeItem(keyLocalStorage);
    contenedorTarjetas.innerHTML = "";
    cantidadElement.innerText = "0";
    precioElement.innerText = "0";
    revisarMensajeVacio();

    //Alerta de GRACIAS
    Swal.fire({
      icon: "success",
      title: "¡Gracias por tu compra! 🛍️",
      text: "Tu pedido ha sido procesado correctamente.",
      confirmButtonColor: "#28a745",
    });
  });
}
