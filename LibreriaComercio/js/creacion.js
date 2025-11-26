"use strict";
import { Libro } from "./claseLibro.js";

let inputCLibro = document.getElementById("inputCrearLibro");
let inputHome = document.getElementById("logoComercio");

export let listaLibrosCreados =
  JSON.parse(localStorage.getItem("listaLibros")) || [];

inputCLibro.addEventListener("click", (event) => {
  let inputTxtNombreLibro = document.getElementById("inputNombre");
  let inputTxtPaginas = document.getElementById("inputPaginas");
  let inputCbPrestado = document.getElementById("inputPrestado");

  let textoCreado = document.getElementById("textoCreado");

  let lib = new Libro(
    inputTxtNombreLibro.value,
    inputTxtPaginas.value,
    inputCbPrestado.checked
  );
  
  textoCreado.textContent = "Libro " + lib.nombre + " creado";

  listaLibrosCreados.push(lib);

  localStorage.setItem("listaLibros", JSON.stringify(listaLibrosCreados));
});

inputHome.addEventListener("click", (event) => {
window.location.href = "home.html";
});
