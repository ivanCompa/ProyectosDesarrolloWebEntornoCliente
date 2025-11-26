"use strict";
let usuario = document.getElementById("inputUsuario");
let contrasena = document.getElementById("inputContrasena");
let btnSubmit = document.getElementById("inputSubmit");

let listausuarios = new Map();
const data = localStorage.getItem("listaUsuarios");
if (data) {
  listausuarios = new Map(JSON.parse(data));
}

// Registrar o iniciar sesión
btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  let perfilUsuario = usuario.value;
  let perfilContrasena = contrasena.value;

  if (listausuarios.size === 0) {
    listausuarios.set(perfilUsuario, perfilContrasena);
    localStorage.setItem(
      "listaUsuarios",
      JSON.stringify(Array.from(listausuarios))
    );
    alert("Usuario registrado correctamente.");
    location.href = "../atrapaLaPalabra.html";
    return;
  } else if (
    listausuarios.has(perfilUsuario) &&
    listausuarios.get(perfilUsuario) === perfilContrasena
  ) {
    location.href = "../atrapaLaPalabra.html";
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
});
