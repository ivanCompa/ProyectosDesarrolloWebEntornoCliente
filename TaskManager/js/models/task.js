export class Tarea {
  constructor(title, description, priority) {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.done = false;
    this.createdAt = new Date();
  }
}
