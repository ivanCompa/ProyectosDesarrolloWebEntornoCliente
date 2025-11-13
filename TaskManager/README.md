# Gestor de Tareas

## 1. Descripción breve del proyecto

Este proyecto es un **Gestor de Tareas** desarrollado en JavaScript que permite crear, visualizar, completar, eliminar y filtrar tareas.  
La aplicación utiliza **localStorage** para persistir los datos y patrones de diseño para mantener el código organizado, escalable y fácil de mantener.  
La interfaz está construida en HTML y CSS, y la lógica se gestiona con JavaScript siguiendo buenas prácticas de arquitectura.

---

## 2. Patrones utilizados

### **Singleton**

- **Qué es:** Garantiza que solo exista una única instancia de una clase en toda la aplicación.
- **Por qué:** Para centralizar el acceso a la lista de tareas almacenadas en `localStorage`.
- **Dónde se usa:** En `singleton.js` con la clase `ListaTareas`, que asegura que siempre se trabaje sobre la misma lista de tareas.

---

### **Facade**

- **Qué es:** Proporciona una interfaz simplificada para interactuar con un sistema complejo.
- **Por qué:** Para encapsular toda la lógica de gestión de tareas (crear, eliminar, completar, filtrar, pintar tabla, limpiar formulario) en una única clase.
- **Dónde se usa:** En `facade.js` con la clase `GestorTabla`, que expone métodos públicos (`crearTarea`, `eliminarTarea`, `marcarTareaCompletada`, `aplicarFiltro`) y oculta la lógica interna.

---

### **Observer**

- **Qué es:** Permite que múltiples objetos (observadores) reaccionen automáticamente cuando cambia el estado de otro objeto (subject).
- **Por qué:** Para actualizar la interfaz (contador y tabla) cada vez que se modifica la lista de tareas sin necesidad de código repetido.
- **Dónde se usa:** En `observer.js` con:
  - `TaskSubject` (el sujeto que mantiene el estado de las tareas).
  - `CounterObserver` (observador que actualiza el contador de tareas).
  - `TableObserver` (observador que renderiza la tabla de tareas).

---

## 3. Instrucciones para ejecutar el proyecto

1. **Clonar o descargar el repositorio** en tu máquina local.
   ```bash
   git clone <url-del-repositorio>
   ```
