"use strict";

const contenedor = document.getElementById("mostrarLibro");
const librosGuardados = JSON.parse(localStorage.getItem("listaLibros"));

if (librosGuardados && librosGuardados.length > 0) {
  librosGuardados.forEach((libro, index) => {
    const tabla = document.createElement("table");
    tabla.className = "tablaResultado"; 

    // Fila de título
    const filaTitulo = document.createElement("tr");
    const celdaTitulo = document.createElement("th");
    celdaTitulo.textContent = libro.nombre;
    filaTitulo.appendChild(celdaTitulo);
    tabla.appendChild(filaTitulo);

    // Fila de datos
    const filaDatos = document.createElement("tr");
    const celdaDatos = document.createElement("td");
    celdaDatos.innerHTML = `${libro.paginas} páginas<br>Prestado: ${
      libro.prestado ? "Sí" : "No"
    }`;
    filaDatos.appendChild(celdaDatos);
    tabla.appendChild(filaDatos);

    contenedor.appendChild(tabla);
  });
} else {
  contenedor.textContent = "No hay libros guardados.";
}
