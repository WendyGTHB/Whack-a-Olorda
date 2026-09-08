// Configuración de Phaser con el gestor de escenas (Tarea 2).
const config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	parent: 'game-container',
	scale: {
		// Escalado responsive manteniendo la proporción 16:9 (Tarea 14).
		// El centrado lo hace el flexbox de #game-container (css/styles.css)
		// para evitar que compita con el centrado propio de Phaser.
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.NO_CENTER,
	},
	scene: [BootScene, StartScene, GameScene, GameOverScene],
};

const game = new Phaser.Game(config);
