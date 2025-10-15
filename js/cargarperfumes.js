// Ruta relativa al archivo JSON
const urlJSON = "./perfumes.json";

fetch(urlJSON)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    return response.json();
  })
  .then((data) => {
    // Si la función para renderizar tarjetas ya está creada en main.js
    if (typeof renderizarTarjetas === "function") {
      renderizarTarjetas(data);
    } else {
      console.warn(" La función renderizarTarjetas no está definida.");
    }
  })
  .catch((error) => {
    console.error(" Hubo un problema con el fetch:", error);
  });
