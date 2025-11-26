"use strict";

import { LISTAPALABRAS } from "./consts.js";

// Creacion de elementos que manipula el programa
let spawnerPalabras = document.getElementById("spawnerPalabras");
let contadorVidas = document.getElementById("contadorVidas");
let contadorPuntos = document.getElementById("contadorPuntos");
let contadorHighScore = document.getElementById("contadorHighScore");
let contadorLastScore = document.getElementById("contadorLastScore");

let vidas = 3;
let puntos = 0;
let vivo = true;

export class gameController {
  
  // Constructor con singleton
  constructor() {
    if (gameController.instance === undefined) {
      gameController.instance = this;

      this.listaPalabrasActivas = [];

      let highScore = localStorage.getItem("highScore") || 0;
      let lastScore = localStorage.getItem("lastScore") || 0;
      contadorHighScore.textContent = "Mejor puntuación: " + highScore;
      contadorLastScore.textContent = "Última puntuación: " + lastScore;
    }
    return gameController.instance;
  }

  // Iniciar partida
  iniciarGeneradorPalabras() {
    vivo = true;
    const generar = () => {
      if (!vivo) return;
      this.crearPalabra();
      const intervalo = 2000 + Math.random() * 1250;
      setTimeout(generar, intervalo);
    };

    generar();
  }

  // Generar palabras
  crearPalabra() {
    // Creacion del DOM
    let palabra = document.createElement("h2");
    palabra.seleccionada = false;
    palabra.eliminada = false;

    palabra.className = "palabra";
    palabra.style.position = "absolute";
    palabra.style.top = "0px";
    palabra.style.cursor = "pointer";

    // Evento de click en cada palabra
    palabra.addEventListener("click", (event) => {
      event.preventDefault();
      this.seleccionarPalabra(palabra);
    });

    spawnerPalabras.appendChild(palabra);

    // Seleccion de la palabra en la lista
    palabra.textContent =
      LISTAPALABRAS[Math.floor(Math.random() * LISTAPALABRAS.length)];
    palabra.style.left =
      Math.floor(
        Math.random() * (spawnerPalabras.offsetWidth - palabra.offsetWidth)
      ) + "px";

    this.listaPalabrasActivas.push(palabra);

    let vidaQuitada = false;

    // Movimiento de la palabra
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        if (!vidaQuitada) {
          let currentTop = parseInt(palabra.style.top, 10) || 0;
          let maxBottom = spawnerPalabras.offsetHeight - palabra.offsetHeight;

          if (currentTop + 30 < maxBottom) {
            palabra.style.top = currentTop + 30 + "px";
          } else {
            if (!palabra.eliminada) {
              this.quitarVida(palabra);
              vidaQuitada = true;
              if (vidas === 0) {
                this.terminarJuego();
              }
            }
          }
        }
      }, 1000 * i);
    }
  }

  // Eliminar vida y desaparecer palabra
  quitarVida(palabra) {
    for (let i = 0; i < this.listaPalabrasActivas.length; i++) {
      const palabraActiva = this.listaPalabrasActivas[i];
      if (palabraActiva === palabra) {
        this.listaPalabrasActivas.splice(i, 1);
      }
    }
    palabra.remove();
    if (vivo) {
      contadorVidas.textContent = "Vidas: " + --vidas;
    } else {
      for (let i = 0; i < this.listaPalabrasActivas.length; i++) {
        this.listaPalabrasActivas[i].remove;
      }
    }
  }

  // Game over (desaparecer palabras y guardar puntuaciones)
  terminarJuego() {
    if (!vivo) return;
    vivo = false;

    localStorage.setItem("lastScore", puntos);
    contadorLastScore.textContent = "Última puntuación: " + puntos;

    let highScore = localStorage.getItem("highScore") || 0;
    if (puntos > highScore) {
      localStorage.setItem("highScore", puntos);
      highScore = puntos;
    }
    contadorHighScore.textContent = "Mejor puntuación: " + highScore;

    for (const palabra of this.listaPalabrasActivas) {
      palabra.remove();
    }
    this.listaPalabrasActivas = [];

    if (!document.getElementById("gameOverMsg")) {
      let gameOver = document.createElement("h1");
      gameOver.id = "gameOverMsg";
      gameOver.className = "gameOverText";
      gameOver.textContent = "GAME OVER";

      let btnReiniciar = document.createElement("input");
      btnReiniciar.type = "button";
      btnReiniciar.value = "Reiniciar";
      btnReiniciar.className = "btnReiniciar";

      btnReiniciar.addEventListener("click", (event) => {
        vidas = 3;
        puntos = 0;
        vivo = true;

        contadorVidas.textContent = "Vidas: " + vidas;
        contadorPuntos.textContent = "Puntos: " + puntos;

        gameOver.remove();
        btnReiniciar.remove();

        this.iniciarGeneradorPalabras();
      });

      document.body.appendChild(gameOver);
      document.body.appendChild(btnReiniciar);
    }
  }

  // Detectar inputs del usuario y si se detecta una palabra, añadir puntos y eliminar la palabra
  buscarPalabra(escritor, palabraEscrita) {
    for (const palabraActiva of this.listaPalabrasActivas) {
      if (palabraActiva.textContent === palabraEscrita) {
        palabraActiva.eliminada = true;
        palabraActiva.remove();
        escritor.value = "";
        if (palabraActiva.seleccionada == true) {
          puntos = puntos + 2;
          contadorPuntos.textContent = "Puntos: " + puntos;
        } else {
          puntos = puntos + 1;
          contadorPuntos.textContent = "Puntos: " + puntos;
        }
      }
    }
  }

  // Evento para marcar palabras clicadas
  seleccionarPalabra(palabra) {
    palabra.seleccionada = true;
    palabra.style.color = "green";
  }
}
