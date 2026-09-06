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
