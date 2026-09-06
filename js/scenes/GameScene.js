// Escena de juego (aún vacía; el tablero llega en la Tarea 4).
class GameScene extends Phaser.Scene {
	constructor() {
		super('GameScene');
	}

	create() {
		this.add.text(640, 360, 'Game Scene', {
			fontSize: '48px',
			color: '#ffffff',
		}).setOrigin(0.5);
	}
}
