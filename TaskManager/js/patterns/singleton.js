export class ListaTareas {
  constructor() {
    if (ListaTareas.instance) return ListaTareas.instance;
    this.listaTareas = JSON.parse(localStorage.getItem("tareas"));
    ListaTareas.instance = this;
  }

  obtenerTareasGuardadas() {
    return JSON.parse(localStorage.getItem("tareas")) || [];
  }
}
