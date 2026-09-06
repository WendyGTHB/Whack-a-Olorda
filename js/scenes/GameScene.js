// Escena de juego: tablero con 6 agujeros (Tarea 4), marcador y
// temporizador (Tarea 5), aparición de personajes (Tarea 6),
// clic y puntuación del personaje normal (Tarea 7).
const CHARACTER_SPAWN_DELAY = 800;
const CHARACTER_MIN_VISIBLE_TIME = 1000;
const CHARACTER_MAX_VISIBLE_TIME = 2000;

class GameScene extends Phaser.Scene {
	constructor() {
		super('GameScene');
	}

	create() {
		// Posiciones de los 6 agujeros (2 filas x 3 columnas), reutilizables
		// por las tareas siguientes (aparición de personajes, clics, etc.).
		this.holePositions = [
			{ x: 340, y: 340 },
			{ x: 640, y: 340 },
			{ x: 940, y: 340 },
			{ x: 340, y: 560 },
			{ x: 640, y: 560 },
			{ x: 940, y: 560 },
		];

		this.holePositions.forEach((pos) => {
			this.add.ellipse(pos.x, pos.y, 160, 100, 0x3e2723);
		});

		this.score = 0;
		this.timeLeft = 30;

		this.scoreText = this.add.text(40, 40, `Puntuación: ${this.score}`, {
			fontSize: '32px',
			color: '#ffffff',
		});

		this.timerText = this.add.text(1240, 40, `Tiempo: ${this.timeLeft}`, {
			fontSize: '32px',
			color: '#ffffff',
		}).setOrigin(1, 0);

		this.time.addEvent({
			delay: 1000,
			loop: true,
			callback: this.onTimerTick,
			callbackScope: this,
		});

		// Estado de ocupación de cada agujero y personaje visible en él.
		this.holeCharacters = new Array(this.holePositions.length).fill(null);

		this.time.addEvent({
			delay: CHARACTER_SPAWN_DELAY,
			loop: true,
			callback: this.spawnCharacter,
			callbackScope: this,
		});
	}

	onTimerTick() {
		if (this.timeLeft <= 0) {
			return;
		}

		this.timeLeft -= 1;
		this.timerText.setText(`Tiempo: ${this.timeLeft}`);
	}

	spawnCharacter() {
		const freeHoleIndexes = this.holeCharacters
			.map((character, index) => (character ? -1 : index))
			.filter((index) => index !== -1);

		if (freeHoleIndexes.length === 0) {
			return;
		}

		const holeIndex = Phaser.Utils.Array.GetRandom(freeHoleIndexes);
		const pos = this.holePositions[holeIndex];

		const character = this.add.ellipse(pos.x, pos.y - 30, 90, 110, 0x8d6e63);
		character.setInteractive();
		character.on('pointerdown', () => this.onCharacterClicked(holeIndex));
		this.holeCharacters[holeIndex] = character;

		const visibleTime = Phaser.Math.Between(
			CHARACTER_MIN_VISIBLE_TIME,
			CHARACTER_MAX_VISIBLE_TIME,
		);

		character.hideTimer = this.time.delayedCall(visibleTime, () => {
			this.hideCharacter(holeIndex);
		});
	}

	// Oculta el personaje del agujero indicado y libera el agujero.
	hideCharacter(holeIndex) {
		const character = this.holeCharacters[holeIndex];
		if (!character) {
			return;
		}

		character.destroy();
		this.holeCharacters[holeIndex] = null;
	}

	onCharacterClicked(holeIndex) {
		const character = this.holeCharacters[holeIndex];
		if (!character) {
			return;
		}

		character.hideTimer.remove();
		this.score += 1;
		this.scoreText.setText(`Puntuación: ${this.score}`);
		this.hideCharacter(holeIndex);
	}
}
