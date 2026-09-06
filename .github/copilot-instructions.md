# Guía del proyecto Whack-a-Olorda

Proyecto de investigación de bachillerato: un clon de Whack-a-Mole hecho con
HTML, CSS, JavaScript y Phaser 3, pensado para GitHub Pages.

## Documentación de referencia

- Especificación funcional y técnica completa: [specifications/specifications.md](../specifications/specifications.md).
- Plan de tareas y estrategia de ramas: [docs/planning/TASKS.md](../docs/planning/TASKS.md).

No dupliques el contenido de estos documentos; consúltalos y enlázalos.

## Restricciones técnicas clave

- Stack exclusivo: HTML, CSS, JavaScript y Phaser 3. No añadir frameworks,
	bundlers ni dependencias adicionales.
- Phaser 3 se carga desde una copia local en `lib/`, nunca desde un CDN.
- Sin servidor backend ni base de datos; el récord se guarda con
	`localStorage`.
- Resolución de referencia `1280x720`, relación de aspecto `16:9`, escalado
	con el modo `FIT` del gestor de escena de Phaser.
- Código simple y legible, acorde a un proyecto de bachillerato: evitar
	abstracciones u optimizaciones innecesarias.

## Estrategia de trabajo

- Una rama por tarea (`task/NN-nombre-corto`), siguiendo el orden de
	[docs/planning/TASKS.md](../docs/planning/TASKS.md).
- No empezar una tarea nueva hasta que la anterior esté verificada
	manualmente (según sus criterios de aceptación) e integrada en `main`.
- No implementar funcionalidad de tareas futuras por adelantado.

## Cómo probar antes de un pull request o merge

Este proyecto se desarrolla en un Codespace, así que no hay un navegador de
"host" al que abrir `index.html` directamente con doble clic. Además, abrirlo
como `file://` rompe la carga de assets de Phaser por restricciones CORS del
navegador. Por eso, incluso sin backend, hay que servirlo por HTTP:

La verificación es siempre manual, en un navegador real:

1. Servir el proyecto con un servidor estático local (ya viene instalado,
	 sin dependencias nuevas): `python3 -m http.server 8123` desde la raíz
	 del repositorio.
2. VS Code reenvía automáticamente el puerto abierto en el Codespace a una
	 URL pública tipo `https://<nombre-codespace>-8123.app.github.dev`;
	 abrirla con `"$BROWSER" <esa-url>/index.html`.
3. Revisar visualmente la pantalla y la consola de DevTools (sin errores) según
	 los criterios de aceptación de la tarea en curso.
4. Detener el servidor una vez terminada la verificación.
