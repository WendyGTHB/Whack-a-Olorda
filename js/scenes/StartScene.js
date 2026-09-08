// Pantalla de inicio con título y botón Start (Tarea 3).
class StartScene extends Phaser.Scene {
	constructor() {
		super('StartScene');
	}

	create() {
		this.add.image(640, 360, 'bg-start').setDisplaySize(1280, 720);

		this.add.text(640, 240, 'Whack-a-Olorda', {
			fontSize: '64px',
			color: '#ffffff',
		}).setOrigin(0.5);

		const startButton = this.add.text(640, 420, 'Start', {
			fontSize: '40px',
			color: '#ffffff',
			backgroundColor: '#2e7d32',
			padding: { x: 24, y: 12 },
		}).setOrigin(0.5);

		startButton.setInteractive({ useHandCursor: true });
		startButton.on('pointerdown', () => {
			this.scene.start('GameScene');
		});
	}
}
