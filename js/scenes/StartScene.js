// Pantalla de inicio con título y botón Start (Tarea 3).
class StartScene extends Phaser.Scene {
	constructor() {
		super('StartScene');
	}

	create() {
		this.add.image(640, 360, 'bg-start').setDisplaySize(1280, 720);

		this.add.text(640, 240, 'Whack-a-Olorda', titleTextStyle('64px')).setOrigin(0.5);

		const startButton = createButton(
			this,
			640,
			360,
			'Start',
			THEME.colors.buttonPositive,
			{ fontSize: '40px' },
		);

		startButton.on('pointerdown', () => {
			this.scene.start('GameScene');
		});
	}
}
