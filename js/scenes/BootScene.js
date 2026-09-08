// Precarga assets del juego y pasa automáticamente a StartScene.
class BootScene extends Phaser.Scene {
	constructor() {
		super('BootScene');
	}

	preload() {
		this.load.image('bg-start', 'assets/images/bg-start.jpeg');
		this.load.image('bg-game', 'assets/images/bg-game.jpeg');
		this.load.image('bg-gameover', 'assets/images/bg-gameover.jpeg');
		this.load.image('hole', 'assets/images/hole.png');
	}

	create() {
		this.scene.start('StartScene');
	}
}
