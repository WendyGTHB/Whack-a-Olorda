// Escena de fin de partida: muestra la puntuación obtenida (Tarea 9).
class GameOverScene extends Phaser.Scene {
	constructor() {
		super('GameOverScene');
	}

	init(data) {
		this.score = data.score || 0;
	}

	create() {
		this.add.text(640, 280, 'Game Over', {
			fontSize: '48px',
			color: '#ffffff',
		}).setOrigin(0.5);

		this.add.text(640, 360, `Puntuación: ${this.score}`, {
			fontSize: '32px',
			color: '#ffffff',
		}).setOrigin(0.5);
	}
}
