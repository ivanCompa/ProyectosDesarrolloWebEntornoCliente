// patterns/facadeDEF.js
import { Tarea } from "../models/task.js";
import { ListaTareas } from "./singleton.js";
import { TaskSubject, ContadorObserver, TablaObserver } from "./observer.js";

export class GestorTabla {
  constructor() {
    this.listaTareasSingleton = new ListaTareas();
    this.tareas = this.listaTareasSingleton.obtenerTareasGuardadas();

    this.tareasCreadas = document.getElementById("tareasCreadas");
    this.seccionTareas = document.getElementById("tablaTareas");
    this.selectorEstado = document.getElementById("selectorEstado"); // antes filtro
    this.inputTitulo = document.getElementById("inputTitulo");
    this.inputDescripcion = document.getElementById("inputDescripcion");
    this.selectorPrioridad = document.getElementById("selectorPrioridad");

    // Subject + Observers
    this.subject = new TaskSubject();
    this.subject.setTareas(this.tareas);
    this.subject.subscribe(new ContadorObserver(this.tareasCreadas));
    this.subject.subscribe(new TablaObserver(this.seccionTareas, this));
  }

  crearTarea(title, description, priority) {
    if (title.trim() === "" || description.trim() === "") {
      alert("Por favor, rellena todos los campos");
      return;
    }
    const nuevaTarea = new Tarea(title, description, priority);
    this.tareas.push(nuevaTarea);
    this._guardar();
    this._limpiarFormulario();
    this.subject.setTareas(this.tareas);
    alert("Tarea creada");
  }

  marcarTareaCompletada(id) {
    for (let tarea of this.tareas) {
      if (tarea.id === id) {
        tarea.done = true;
        break;
      }
    }
    this._guardar();
    this.subject.setTareas(this.tareas);
  }

  eliminarTarea(id) {
    let nuevasTareas = [];
    for (let tarea of this.tareas) {
      if (tarea.id !== id) {
        nuevasTareas.push(tarea);
      }
    }
    this.tareas = nuevasTareas;
    this._guardar();
    this.subject.setTareas(this.tareas);
  }

  aplicarFiltro() {
    const valor = this.selectorEstado.value;
    let listaFiltrada = [];

    if (valor === "all") {
      listaFiltrada = this.tareas;
    } else if (valor === "done") {
      for (let tarea of this.tareas) {
        if (tarea.done) {
          listaFiltrada.push(tarea);
        }
      }
    } else if (valor === "notdone") {
      for (let tarea of this.tareas) {
        if (!tarea.done) {
          listaFiltrada.push(tarea);
        }
      }
    } else {
      for (let tarea of this.tareas) {
        if (tarea.priority === valor) {
          listaFiltrada.push(tarea);
        }
      }
    }

    new TablaObserver(this.seccionTareas, this).update(listaFiltrada);
    new ContadorObserver(this.tareasCreadas).update(listaFiltrada);
  }

  _guardar() {
    localStorage.setItem("tareas", JSON.stringify(this.tareas));
  }

  _limpiarFormulario() {
    this.inputTitulo.value = "";
    this.inputDescripcion.value = "";
    this.selectorPrioridad.value = "normal";
  }
}
