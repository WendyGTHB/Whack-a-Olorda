// Configuración de Phaser con el gestor de escenas (Tarea 2).
const config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	parent: 'game-container',
	scene: [BootScene, StartScene, GameScene, GameOverScene],
};

const game = new Phaser.Game(config);
