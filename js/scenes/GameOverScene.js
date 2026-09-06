// Escena de fin de partida (aún vacía; la puntuación llega en la Tarea 9).
class GameOverScene extends Phaser.Scene {
	constructor() {
		super('GameOverScene');
	}

	create() {
		this.add.text(640, 360, 'Game Over Scene', {
			fontSize: '48px',
			color: '#ffffff',
		}).setOrigin(0.5);
	}
}
