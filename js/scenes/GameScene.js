// Escena de juego: tablero con 6 agujeros (Tarea 4), marcador y
// temporizador (Tarea 5).
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

		this.score = 0;
		this.timeLeft = 30;

		this.scoreText = this.add.text(40, 40, `Puntuación: ${this.score}`, {
			fontSize: '32px',
			color: '#ffffff',
		});

		this.timerText = this.add.text(1240, 40, `Tiempo: ${this.timeLeft}`, {
			fontSize: '32px',
			color: '#ffffff',
		}).setOrigin(1, 0);

		this.time.addEvent({
			delay: 1000,
			loop: true,
			callback: this.onTimerTick,
			callbackScope: this,
		});
	}

	onTimerTick() {
		if (this.timeLeft <= 0) {
			return;
		}

		this.timeLeft -= 1;
		this.timerText.setText(`Tiempo: ${this.timeLeft}`);
	}
}
