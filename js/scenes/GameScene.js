// Escena de juego: tablero con 6 agujeros (Tarea 4).
class GameScene extends Phaser.Scene {
	constructor() {
		super('GameScene');
	}

	create() {
		// Posiciones de los 6 agujeros (2 filas x 3 columnas), reutilizables
		// por las tareas siguientes (aparición de personajes, clics, etc.).
		this.holePositions = [
			{ x: 340, y: 340 },
			{ x: 640, y: 340 },
			{ x: 940, y: 340 },
			{ x: 340, y: 560 },
			{ x: 640, y: 560 },
			{ x: 940, y: 560 },
		];

		this.holePositions.forEach((pos) => {
			this.add.ellipse(pos.x, pos.y, 160, 100, 0x3e2723);
		});

		this.add.text(640, 100, 'Game Scene', {
			fontSize: '48px',
			color: '#ffffff',
		}).setOrigin(0.5);
	}
}
