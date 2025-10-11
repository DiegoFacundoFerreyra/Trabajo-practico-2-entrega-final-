const cuentaCarritoElement = document.getElementById("contador-carrito");
const keyLocalStorage = "perfumes";

// Agregar producto al carrito
function agregarAlCarrito(producto) {
  let memoria = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];
  const indice = memoria.findIndex((p) => p.id === producto.id);

  if (indice === -1) {
    // No existe, lo agregamos
    memoria.push({ ...producto, cantidad: 1 });
  } else {
    // Ya existe, sumamos cantidad
    memoria[indice].cantidad++;
  }

  localStorage.setItem(keyLocalStorage, JSON.stringify(memoria));
  actualizarNumeroCarrito();
}

// Restar producto del carrito
function restarAlCarrito(producto) {
  let memoria = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];
  const indice = memoria.findIndex((p) => p.id === producto.id);

  if (indice !== -1) {
    memoria[indice].cantidad--;
    if (memoria[indice].cantidad <= 0) {
      memoria.splice(indice, 1);
    }
    localStorage.setItem(keyLocalStorage, JSON.stringify(memoria));
  }

  actualizarNumeroCarrito();
}

// Actualizar número del carrito
function actualizarNumeroCarrito() {
  const memoria = JSON.parse(localStorage.getItem(keyLocalStorage)) || [];
  const total = memoria.reduce((acum, p) => acum + p.cantidad, 0);
  if (cuentaCarritoElement) cuentaCarritoElement.innerText = total;
}

// Vaciar carrito
function reiniciarCarrito() {
  localStorage.removeItem(keyLocalStorage);
  actualizarNumeroCarrito();
}

// Ejecuta al cargar
actualizarNumeroCarrito();
