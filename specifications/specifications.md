# Especificaciones de Whack-a-Olorda

## Descripción

El objetivo del proyecto es crear un videojuego sencillo en el marco de un
proyecto de investigación de bachillerato de Cataluña, con la ayuda de
asistentes de código basados en inteligencia artificial.

El videojuego será un clon del clásico **Whack-a-Mole** y se desarrollará a
partir del diseño mostrado en `assets/sketchtopo1.png`.

## Objetivo del videojuego

El jugador deberá hacer clic sobre los personajes que aparezcan en los
agujeros del tablero para conseguir puntos antes de que se agote el tiempo.
El juego incluirá personajes con diferentes valores de puntuación y una bomba
que penalizará al jugador.

## Plataforma de publicación

El juego se ejecutará en **GitHub Pages**, sin necesidad de un servidor de
aplicación.

## Tecnologías

- HTML para la estructura de la página.
- CSS para los estilos y la presentación visual.
- JavaScript para la lógica del juego.
- Phaser 3 como framework para la escena, la interacción y el ciclo de juego.

La elección de estas tecnologías mantiene el desarrollo simple, permite
ejecutar el proyecto directamente en el navegador y centra el trabajo en el
uso de la inteligencia artificial como asistente de código.

## Diseño de referencia

El diseño inicial se encuentra en `assets/sketchtopo1.png` e incluye:

- Un tablero con seis agujeros.
- Un marcador de puntuación.
- Un temporizador.
- Personajes normales, especiales y superiores.
- Una bomba como elemento penalizador.

## Requisitos funcionales

- Mostrar el tablero de juego en el navegador.
- Mostrar y actualizar la puntuación.
- Mostrar y actualizar el tiempo restante, que comenzará en 30 segundos.
- Hacer aparecer personajes en los agujeros de forma dinámica, pudiendo haber
	más de un personaje visible a la vez en agujeros distintos.
- Intentar generar un nuevo personaje aproximadamente cada `0,8` segundos,
	eligiendo al azar uno de los agujeros que estén libres en ese momento.
- Mantener cada personaje visible durante un tiempo aleatorio de entre `1` y
	`2` segundos; si el jugador no hace clic sobre él en ese intervalo, el
	personaje se esconde automáticamente sin penalización.
- Permitir que el jugador interactúe con los personajes mediante clics del
	ratón.
- Devolver cada topo a su agujero cuando el jugador haga clic sobre él.
- Asignar `+1` punto al personaje normal.
- Asignar `+2` puntos al personaje especial.
- Asignar `+5` puntos al personaje superior.
- Restar `-3` puntos al hacer clic sobre la bomba, sin ningún otro efecto sobre
	la partida.
- No aplicar ninguna penalización cuando el jugador haga clic sobre un agujero
	vacío o sobre el tablero fuera de un personaje.
- Impedir que la puntuación baje de `0`: si una penalización dejaría la
	puntuación por debajo de `0`, esta se fija en `0`.
- Ajustar la probabilidad de aparición de cada elemento al generar un
	personaje: `50%` normal, `15%` especial, `10%` superior y `25%` bomba, de modo
	que el topo normal aparecerá con mayor frecuencia que el especial y el
	especial con mayor frecuencia que el superior.
- Finalizar la partida cuando el temporizador llegue a cero.
- Mostrar una pantalla de inicio antes de cada partida.
- Incluir un botón `Start` en la pantalla de inicio.
- Comenzar la partida y el temporizador de 30 segundos al pulsar `Start`.
- Mostrar una pantalla de `Game Over` al terminar la partida.
- Mostrar en `Game Over` la puntuación total de la última partida.
- Mostrar en `Game Over` la puntuación más alta conseguida en todas las
	partidas.
- Permitir iniciar otra partida desde `Game Over`.
- Permitir volver a la pantalla de inicio desde `Game Over`.
- Incluir un botón de pausa durante la partida que detenga el temporizador y
	la aparición de personajes.
- Mostrar, al pausar, un menú superpuesto con las opciones `Reanudar` y
	`Salir al inicio`.
- Mostrar una confirmación (`¿Seguro que quieres salir? Perderás el progreso
	de esta partida.`) antes de salir al inicio desde el menú de pausa, ya que
	esta acción descarta la partida en curso.

## Puntuación y récord personal

El récord personal se guardará en el almacenamiento local del navegador
mediante `localStorage`. De este modo, el juego podrá conservar la puntuación
más alta entre partidas sin utilizar una base de datos ni un servidor.

El récord se actualizará cuando la puntuación de una partida supere el récord
guardado. Si no existe ningún récord guardado, se utilizará una puntuación
inicial de `0`.

## Flujo de pantallas

1. **Pantalla de inicio:** muestra el botón `Start`. El temporizador todavía no
	 ha comenzado.
2. **Pantalla de juego:** se inicia al pulsar `Start`, comienza la cuenta atrás
	 desde 30 segundos y se puede interactuar con los personajes mediante el
	 ratón. Un botón de pausa detiene el temporizador y la aparición de
	 personajes, mostrando un menú con las opciones `Reanudar` y
	 `Salir al inicio`; esta última pide confirmación antes de abandonar la
	 partida, ya que el progreso se pierde.
3. **Pantalla de Game Over:** aparece cuando el temporizador llega a cero y
	 muestra la puntuación de la última partida y el récord personal. Desde esta
	 pantalla se puede volver a jugar o regresar al inicio.

## Restricciones técnicas

- El proyecto debe utilizar HTML, CSS, JavaScript y Phaser 3.
- Phaser 3 se cargará mediante una copia local del fichero de la librería
	incluida en el repositorio (sin depender de un CDN externo en tiempo de
	ejecución), servida como fichero estático junto con el resto del proyecto.
- No debe requerir un servidor backend ni una base de datos.
- Debe poder publicarse y ejecutarse mediante GitHub Pages.
- El juego debe ser responsive y adaptarse a distintos tamaños de pantalla,
	manteniendo una relación de aspecto `16:9` sobre una resolución de
	referencia de `1280x720`, escalado mediante el gestor de escena de Phaser en
	modo `FIT` con centrado automático.
- El juego debe funcionar en las últimas versiones de los navegadores
	evergreen (Chrome, Firefox, Edge y Safari), sin soporte para navegadores
	antiguos como Internet Explorer.
- El código debe mantenerse sencillo y adecuado para un proyecto de
	investigación de bachillerato.

## Estructura prevista

```text
.
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   └── scenes/
│       ├── BootScene.js
│       ├── StartScene.js
│       ├── GameScene.js
│       └── GameOverScene.js
├── lib/
│   └── phaser.min.js
├── assets/
│   └── images/
└── specifications/
    ├── assets/
    │   └── sketchtopo1.png
    └── specifications.md
```

- `index.html`: punto de entrada del juego, publicado directamente por GitHub
	Pages.
- `css/styles.css`: estilos mínimos de la página que contiene el lienzo del
	juego.
- `js/main.js`: configuración de Phaser (dimensiones, escalado, lista de
	escenas).
- `js/scenes/`: una escena por pantalla (arranque/precarga, inicio, juego y
	Game Over), siguiendo el flujo de pantallas definido más arriba.
- `lib/phaser.min.js`: copia local de Phaser 3 (ver restricciones técnicas).
- `assets/images/`: sprites del tablero, los personajes y la bomba.
- `specifications/`: documentación del proyecto (sin cambios).

## Historial de cambios

| Fecha | Cambio |
|---|---|
| 2026-09-06 | Creación de la especificación inicial del videojuego basada en el diseño de referencia. |
| 2026-09-06 | Se añaden la distribución de aparición por puntuación, la interacción mediante clic, el temporizador de 30 segundos, las pantallas de inicio y Game Over, y el récord personal mediante almacenamiento local. |
| 2026-09-06 | Se detallan los requisitos funcionales: cadencia de aparición y ocultación de personajes, aparición simultánea en varios agujeros, probabilidades concretas por elemento (incluida la bomba), ausencia de penalización por clic fallido y límite inferior de `0` en la puntuación. |
| 2026-09-06 | Se incrementa la probabilidad de aparición de la bomba del `5%` al `25%`, ajustando el resto de probabilidades (`50%` normal, `15%` especial, `10%` superior). |
| 2026-09-06 | Se añade el estándar de pausa durante la partida: botón de pausa, menú con `Reanudar` y `Salir al inicio`, y confirmación antes de abandonar la partida en curso. |
| 2026-09-06 | Se concretan las restricciones técnicas: carga de Phaser 3 mediante copia local en el repositorio, diseño responsive con relación de aspecto `16:9` (resolución de referencia `1280x720`) y soporte limitado a navegadores evergreen. |
| 2026-09-06 | Se anticipa la estructura del código fuente del juego (`index.html`, `css/`, `js/scenes/`, `lib/phaser.min.js`, `assets/images/`) junto a la carpeta `specifications/` existente. |