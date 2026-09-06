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
- Hacer aparecer personajes en los agujeros de forma dinámica.
- Permitir que el jugador interactúe con los personajes mediante clics del
	ratón.
- Devolver cada topo a su agujero cuando el jugador haga clic sobre él.
- Asignar `+1` punto al personaje normal.
- Asignar `+2` puntos al personaje especial.
- Asignar `+5` puntos al personaje superior.
- Restar `-3` puntos al hacer clic sobre la bomba.
- Ajustar la probabilidad de aparición de cada tipo de personaje a su valor de
	puntuación: el topo normal aparecerá con mayor frecuencia que el especial y
	el especial con mayor frecuencia que el superior.
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
	 ratón.
3. **Pantalla de Game Over:** aparece cuando el temporizador llega a cero y
	 muestra la puntuación de la última partida y el récord personal. Desde esta
	 pantalla se puede volver a jugar o regresar al inicio.

## Restricciones técnicas

- El proyecto debe utilizar HTML, CSS, JavaScript y Phaser 3.
- No debe requerir un servidor backend ni una base de datos.
- Debe poder publicarse y ejecutarse mediante GitHub Pages.
- El código debe mantenerse sencillo y adecuado para un proyecto de
	investigación de bachillerato.

## Estructura prevista

```text
specifications/
├── assets/
│   └── sketchtopo1.png
└── specifications.md
```

## Historial de cambios

| Fecha | Cambio |
|---|---|
| 2026-09-06 | Creación de la especificación inicial del videojuego basada en el diseño de referencia. |
| 2026-09-06 | Se añaden la distribución de aparición por puntuación, la interacción mediante clic, el temporizador de 30 segundos, las pantallas de inicio y Game Over, y el récord personal mediante almacenamiento local. |