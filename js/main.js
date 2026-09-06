// Configuración mínima de Phaser para la Tarea 1 (andamiaje del proyecto).
// Las escenas reales (BootScene, StartScene, GameScene, GameOverScene) se
// añadirán en la Tarea 2.
const config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	parent: 'game-container',
};

const game = new Phaser.Game(config);

console.log('Phaser cargado correctamente. Versión:', Phaser.VERSION);
