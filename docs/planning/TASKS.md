# Plan de tareas — Whack-a-Olorda

Este documento define el desglose de tareas para implementar el juego a
partir de [specifications/specifications.md](specifications/specifications.md),
ordenadas de menor a mayor complejidad. Cada tarea se implementa en una rama
propia, se verifica manualmente y solo entonces se integra en `main` antes de
empezar la siguiente.

## Estrategia de trabajo

- Una rama por tarea, creada desde `main` una vez que la tarea anterior esté
	integrada: `task/NN-nombre-corto`.
- Cada tarea debe dejar el juego en un estado que se pueda abrir en el
	navegador (o los tests, si los hay) sin errores, aunque no esté completo.
- Al terminar una tarea: verificar manualmente según los criterios de
	aceptación de esa tarea, hacer commit/push de la rama, revisar (PR o
	revisión manual) y fusionar a `main` antes de crear la siguiente rama.
- No se avanza a la siguiente tarea hasta que la actual esté verificada e
	integrada.
- No se escribe código de una tarea hasta que las anteriores estén cerradas,
	para mantener el histórico de ramas alineado con el orden de este documento.

## Tarea 0 — Integrar la rama `specifications` en `main`

**Rama:** (ninguna nueva; fusión directa de `specifications`)

- Fusionar la rama `specifications` (documentación ya cerrada) en `main` para
	partir de una base limpia antes de crear las ramas de implementación.

**Verificación:** `main` contiene `README.md` y `specifications/` actualizados;
no hay código de juego todavía.

---

## Tarea 1 — Andamiaje del proyecto

**Rama:** `task/01-project-scaffolding`

- Crear la estructura de carpetas prevista en la especificación:
	`index.html`, `css/styles.css`, `js/main.js`, `js/scenes/`, `lib/`,
	`assets/images/`.
- Añadir una copia local de `phaser.min.js` en `lib/` (sin CDN).
- `index.html` carga `lib/phaser.min.js`, `css/styles.css` y `js/main.js`.
- `js/main.js` puede quedar con un `console.log` o configuración mínima de
	Phaser (aún sin escenas reales).

**Verificación:** abrir `index.html` en el navegador (servidor estático local)
sin errores en consola; se confirma que Phaser se carga correctamente.

---

## Tarea 2 — Arranque de Phaser y gestor de escenas

**Rama:** `task/02-phaser-bootstrap`

- Configurar `js/main.js` con las dimensiones de referencia `1280x720`,
	tipo `Phaser.AUTO` y la lista de escenas (aunque estén casi vacías).
- Crear `BootScene.js` (precarga de assets básicos/placeholders) y dejar
	`StartScene.js`, `GameScene.js`, `GameOverScene.js` como escenas vacías que
	solo muestran un texto identificativo (p. ej. "Start Scene").
- `BootScene` pasa automáticamente a `StartScene`.

**Verificación:** al cargar la página se ve un lienzo de `1280x720` con el
texto de `StartScene`, sin errores en consola.

---

## Tarea 3 — Pantalla de inicio

**Rama:** `task/03-start-screen`

- Implementar `StartScene` con el diseño básico de la pantalla de inicio y el
	botón `Start` (puede ser un `Phaser.GameObjects.Text` o sprite simple,
	sin arte final todavía).
- Al pulsar `Start`, transicionar a `GameScene` (que de momento puede seguir
	vacía o mostrar un texto placeholder).

**Verificación:** se ve la pantalla de inicio con el botón `Start`; al
pulsarlo cambia de escena.

---

## Tarea 4 — Tablero de juego (6 agujeros)

**Rama:** `task/04-game-board`

- Implementar en `GameScene` el tablero con los 6 agujeros en las posiciones
	del diseño de referencia (`assets/sketchtopo1.png`), usando gráficos
	simples o placeholders si el arte final no está listo.
- Guardar las posiciones/coordenadas de los agujeros en una estructura de
	datos reutilizable (p. ej. array de 6 posiciones) para las tareas
	siguientes.

**Verificación:** se ve el tablero con los 6 agujeros al entrar en
`GameScene` desde `StartScene`.

---

## Tarea 5 — Marcador y temporizador (UI, sin lógica de fin de partida)

**Rama:** `task/05-score-timer-ui`

- Mostrar en `GameScene` el marcador de puntuación (inicia en `0`) y el
	temporizador (inicia en `30` segundos).
- Implementar la cuenta atrás del temporizador cada segundo mediante el
	reloj de Phaser (sin todavía finalizar la partida al llegar a `0`).

**Verificación:** el temporizador desciende visualmente de `30` a `0`
correctamente; el marcador se muestra fijo en `0`.

---

## Tarea 6 — Aparición de personajes (sin interacción ni puntuación)

**Rama:** `task/06-character-spawn`

- Implementar la generación periódica de personajes (aprox. cada `0,8 s`),
	eligiendo al azar un agujero libre entre los 6 disponibles.
- Cada personaje debe permanecer visible un tiempo aleatorio entre `1` y `2`
	segundos y ocultarse automáticamente si no se interactúa con él.
- Permitir varios personajes visibles a la vez en agujeros distintos.
- De momento, usar un único tipo de personaje (placeholder "topo normal"),
	sin bomba ni tipos especiales todavía.

**Verificación:** los personajes aparecen y desaparecen solos en agujeros
distintos, con la cadencia y duración especificadas, sin intervención del
jugador.

---

## Tarea 7 — Clic e interacción básica (puntuación del personaje normal)

**Rama:** `task/07-click-scoring-normal`

- Hacer clicables los personajes en pantalla.
- Al hacer clic sobre un personaje normal: ocultarlo inmediatamente (vuelve a
	su agujero) y sumar `+1` al marcador.
- Un clic sobre un agujero vacío o fuera de un personaje no debe tener
	ningún efecto sobre la puntuación.

**Verificación:** al hacer clic sobre un personaje visible, desaparece y la
puntuación sube en `1`; los clics fuera de personaje no alteran la
puntuación.

---

## Tarea 8 — Tipos de personajes y probabilidades

**Rama:** `task/08-character-types-probabilities`

- Añadir los tipos especial (`+2`), superior (`+5`) y la bomba (`-3`).
- Aplicar las probabilidades de aparición: `50%` normal, `15%` especial,
	`10%` superior, `25%` bomba.
- Al hacer clic en la bomba: restar `3` puntos, sin ningún otro efecto sobre
	la partida.
- Impedir que la puntuación baje de `0` (fijarla en `0` si una penalización
	la dejaría negativa).

**Verificación:** cada tipo de personaje otorga los puntos correctos al
hacer clic; la bomba resta puntos; la puntuación nunca es negativa; con
partidas de prueba largas, la proporción de apariciones se aproxima a las
probabilidades definidas.

---

## Tarea 9 — Fin de partida y pantalla de Game Over

**Rama:** `task/09-game-over-screen`

- Al llegar el temporizador a `0`: detener la aparición de personajes y
	transicionar a `GameOverScene`.
- `GameOverScene` muestra la puntuación obtenida en la última partida.

**Verificación:** al agotarse el tiempo, deja de haber nuevos personajes y
aparece la pantalla de Game Over con la puntuación correcta.

---

## Tarea 10 — Récord personal con `localStorage`

**Rama:** `task/10-highscore-localstorage`

- Leer el récord guardado en `localStorage` al mostrar `GameOverScene`
	(usar `0` si no existe ninguno).
- Actualizar el récord guardado si la puntuación de la partida lo supera.
- Mostrar el récord personal en `GameOverScene`.

**Verificación:** el récord persiste entre recargas de página; solo se
actualiza cuando la nueva puntuación es mayor que el récord previo.

---

## Tarea 11 — Navegación desde Game Over

**Rama:** `task/11-gameover-navigation`

- Añadir botones en `GameOverScene` para iniciar otra partida (vuelve a
	`GameScene` reiniciando puntuación y temporizador) y para volver a la
	pantalla de inicio (`StartScene`).

**Verificación:** ambos botones funcionan y cada partida nueva empieza con
puntuación `0` y temporizador `30`.

---

## Tarea 12 — Pausa durante la partida

**Rama:** `task/12-pause-menu`

- Añadir un botón de pausa visible durante `GameScene`.
- Al pulsarlo: detener el temporizador y la aparición de personajes, y
	mostrar un menú superpuesto con las opciones `Reanudar` y
	`Salir al inicio`.
- `Reanudar` continúa la partida exactamente donde se quedó (temporizador y
	personajes visibles incluidos).

**Verificación:** al pausar, el temporizador y la aparición de personajes se
detienen; al reanudar, continúan desde el mismo punto.

---

## Tarea 13 — Confirmación al salir desde pausa

**Rama:** `task/13-pause-exit-confirmation`

- Al pulsar `Salir al inicio` desde el menú de pausa, mostrar la confirmación
	`¿Seguro que quieres salir? Perderás el progreso de esta partida.` antes de
	descartar la partida y volver a `StartScene`.

**Verificación:** cancelar la confirmación mantiene la partida en pausa;
confirmar descarta la partida y vuelve a la pantalla de inicio.

---

## Tarea 14 — Diseño responsive (16:9, escalado `FIT`)

**Rama:** `task/14-responsive-scaling`

- Configurar el gestor de escena de Phaser en modo `FIT` con centrado
	automático, manteniendo la relación de aspecto `16:9` sobre la resolución
	de referencia `1280x720`.

**Verificación:** redimensionar la ventana del navegador mantiene la
proporción `16:9` y centra el lienzo, sin deformaciones.

---

## Tarea 15 — Arte final e integración de assets

**Rama:** `task/15-visual-assets`

- Sustituir los placeholders (tablero, agujeros, personajes normal/especial/
	superior, bomba, fondos y botones) por los sprites definitivos basados en
	`specifications/assets/sketchtopo1.png`, ubicados en `assets/images/`.

**Verificación:** revisión visual de todas las pantallas (inicio, juego,
pausa, Game Over) con el arte definitivo, sin roturas de maquetación.

---

## Tarea 16 — Pulido final, pruebas cruzadas y publicación

**Rama:** `task/16-polish-qa-deploy`

- Probar el juego en las últimas versiones de Chrome, Firefox, Edge y Safari.
- Revisar el cumplimiento completo de los requisitos funcionales de
	`specifications.md`.
- Configurar GitHub Pages para publicar `main` (o la carpeta correspondiente)
	y actualizar `README.md` con el enlace al juego publicado.

**Verificación:** el juego funciona correctamente en los navegadores citados
y es accesible públicamente mediante la URL de GitHub Pages.

## Historial de cambios

| Fecha | Cambio |
|---|---|
| 2026-09-06 | Creación del plan de tareas inicial, ordenado de menor a mayor complejidad, con una rama por tarea y criterios de verificación. |
