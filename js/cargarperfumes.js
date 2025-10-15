// Ruta relativa al archivo JSON
const urlJSON = "./js/main.json";

fetch(urlJSON)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Perfumes cargados:", data);

    // Aquí podés usar los datos como si fueran tu array original
    data.forEach((perfume) => {
      console.log(`${perfume.nombre} - $${perfume.precio}`);
    });

    // Si querés guardarlo en una variable global:
    window.perfumes = data;
  })
  .catch((error) => {
    console.error("Hubo un problema con el fetch:", error);
  });
