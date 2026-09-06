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
- Mostrar y actualizar el tiempo restante.
- Hacer aparecer personajes en los agujeros de forma dinámica.
- Permitir que el jugador interactúe con los personajes mediante clics.
- Asignar `+1` punto al personaje normal.
- Asignar `+2` puntos al personaje especial.
- Asignar `+5` puntos al personaje superior.
- Restar `-3` puntos al hacer clic sobre la bomba.
- Finalizar la partida cuando el temporizador llegue a cero.
- Mostrar el resultado final de la partida.

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