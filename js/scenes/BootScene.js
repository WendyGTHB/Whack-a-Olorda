// Precarga assets básicos/placeholders y pasa automáticamente a StartScene.
class BootScene extends Phaser.Scene {
	constructor() {
		super('BootScene');
	}

	preload() {
		// Sin assets todavía; se añadirán en tareas posteriores.
	}

	create() {
		this.scene.start('StartScene');
	}
}
