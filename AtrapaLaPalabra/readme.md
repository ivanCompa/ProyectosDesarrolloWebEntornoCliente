# Atrapa la Palabra

## Descripción
Atrapa la Palabra es un juego web desarrollado en **HTML, CSS y JavaScript** donde el jugador debe atrapar palabras que caen desde la parte superior de la pantalla escribiéndolas o seleccionándolas con un clic.  
El proyecto incluye un sistema de **inicio de sesión** con almacenamiento en `localStorage`, lo que permite registrar usuarios y guardar sus puntuaciones.

---

## Funcionalidades principales
- Inicio de sesión:
  - Registro de nuevos usuarios.
  - Validación de usuario y contraseña.
  - Persistencia de datos mediante `localStorage`.

- Juego interactivo:
  - Palabras que caen de manera progresiva y cada vez más rápida.
  - Posibilidad de eliminar palabras escribiéndolas en el campo de texto o haciendo clic sobre ellas.
  - Sistema de vidas y puntos.

- Sistema de puntuaciones:
  - Se guarda la última puntuación obtenida.
  - Se mantiene la mejor puntuación alcanzada por el jugador.
  - Ambas se muestran en pantalla durante la partida.

- Game Over:
  - Al perder todas las vidas, se muestra un mensaje de "GAME OVER" y un botón de reinicio.
  - Reiniciar restablece vidas y puntos, permitiendo comenzar una nueva partida.