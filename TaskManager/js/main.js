"use strict";

import { GestorTabla } from "./patterns/facade.js";

const creadorFacade = new GestorTabla();

// Evento de boton de guardar tarea
document.getElementById("inputGuardar").addEventListener("click", (event) => {
  event.preventDefault();
  creadorFacade.crearTarea(
    document.getElementById("inputTitulo").value,
    document.getElementById("inputDescripcion").value,
    document.getElementById("selectorPrioridad").value
  );
});

// Evento de combobox para filtrar tareas
document
  .getElementById("filtro")
  .addEventListener("change", () => creadorFacade.aplicarFiltro());

// Inicialización
creadorFacade.aplicarFiltro();
