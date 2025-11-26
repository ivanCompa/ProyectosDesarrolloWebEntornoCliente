"use strict";

import { gameController } from "./gameController.js";

let gC = new gameController();
let escritor = document.getElementById("escritor");
let btnIniciarJuego = document.getElementById("btnIniciarJuego");

// Evento para iniciar el juego
btnIniciarJuego.addEventListener("click", (event) => {
  event.preventDefault();
  gC.iniciarGeneradorPalabras();
  btnIniciarJuego.style.display = "none";
});

// Evento al pulsar teclas para detectar palabras
escritor.addEventListener("keyup", (event) => {
  event.preventDefault();
  gC.buscarPalabra(escritor, escritor.value);
});
