// patterns/observerDEF.js

export class TaskSubject {
  constructor() {
    this.observers = [];
    this.tareas = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notify() {
    this.observers.forEach((observer) => observer.update(this.tareas));
  }

  setTareas(tareas) {
    this.tareas = tareas;
    this.notify();
  }
}

export class ContadorObserver {
  constructor(element) {
    this.element = element;
  }
  update(tareas) {
    this.element.textContent = "Total de tareas creadas: " + tareas.length;
  }
}

export class TablaObserver {
  constructor(section, facade) {
    this.section = section;
    this.facade = facade;
  }

  update(tareas) {
    this.section.innerHTML = "";
    const tabla = document.createElement("table");

    const encabezados = [
      "Título",
      "Descripción",
      "Prioridad",
      "Fecha de creación",
      "Completada",
      "Acciones",
    ];
    const filaEncabezado = document.createElement("tr");
    encabezados.forEach((texto) => {
      const th = document.createElement("th");
      th.textContent = texto;
      filaEncabezado.appendChild(th);
    });
    tabla.appendChild(filaEncabezado);

    for (let tarea of tareas) {
      const fila = document.createElement("tr");

      const tdTitulo = document.createElement("td");
      tdTitulo.textContent = tarea.title;
      fila.appendChild(tdTitulo);

      const tdDescripcion = document.createElement("td");
      tdDescripcion.textContent = tarea.description;
      fila.appendChild(tdDescripcion);

      const tdPrioridad = document.createElement("td");
      tdPrioridad.textContent = tarea.priority;
      fila.appendChild(tdPrioridad);

      const tdFecha = document.createElement("td");
      tdFecha.textContent = new Date(tarea.createdAt).toLocaleDateString();
      fila.appendChild(tdFecha);

      const tdCompletada = document.createElement("td");
      tdCompletada.textContent = tarea.done ? "Completada" : "No completada";
      fila.appendChild(tdCompletada);

      if (tarea.done) {
        [tdTitulo, tdDescripcion, tdPrioridad, tdFecha, tdCompletada].forEach(
          (td) => (td.style.color = "grey")
        );
      }

      const tdAcciones = document.createElement("td");
      if (!tarea.done) {
        const btnCompletar = document.createElement("button");
        btnCompletar.textContent = "Completar";
        btnCompletar.addEventListener("click", () =>
          this.facade.marcarTareaCompletada(tarea.id)
        );
        tdAcciones.appendChild(btnCompletar);
      }

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.style.marginLeft = "5px";
      btnEliminar.addEventListener("click", () =>
        this.facade.eliminarTarea(tarea.id)
      );
      tdAcciones.appendChild(btnEliminar);

      fila.appendChild(tdAcciones);
      tabla.appendChild(fila);
    }

    this.section.appendChild(tabla);
  }
}
