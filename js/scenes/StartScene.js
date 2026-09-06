// Escena de inicio (aún vacía; el diseño y el botón Start llegan en la Tarea 3).
class StartScene extends Phaser.Scene {
	constructor() {
		super('StartScene');
	}

	create() {
		this.add.text(640, 360, 'Start Scene', {
			fontSize: '48px',
			color: '#ffffff',
		}).setOrigin(0.5);
	}
}
