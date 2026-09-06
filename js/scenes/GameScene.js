// Escena de juego: tablero con 6 agujeros (Tarea 4), marcador y
// temporizador (Tarea 5), aparición de personajes (Tarea 6),
// clic y puntuación del personaje normal (Tarea 7), tipos de
// personajes y probabilidades (Tarea 8).
const CHARACTER_SPAWN_DELAY = 800;
const CHARACTER_MIN_VISIBLE_TIME = 1000;
const CHARACTER_MAX_VISIBLE_TIME = 2000;

// Tipos de personaje con sus puntos, color placeholder y probabilidad de
// aparición (deben sumar 1).
const CHARACTER_TYPES = [
	{ name: 'normal', points: 1, color: 0x8d6e63, probability: 0.5 },
	{ name: 'especial', points: 2, color: 0xffd54f, probability: 0.15 },
	{ name: 'superior', points: 5, color: 0x42a5f5, probability: 0.1 },
	{ name: 'bomba', points: -3, color: 0x212121, probability: 0.25 },
];

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
		const type = this.pickCharacterType();

		const character = this.add.ellipse(pos.x, pos.y - 30, 90, 110, type.color);
		character.characterType = type;
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

	// Elige un tipo de personaje al azar respetando las probabilidades
	// definidas en CHARACTER_TYPES.
	pickCharacterType() {
		const roll = Math.random();
		let cumulative = 0;

		for (const type of CHARACTER_TYPES) {
			cumulative += type.probability;
			if (roll < cumulative) {
				return type;
			}
		}

		return CHARACTER_TYPES[CHARACTER_TYPES.length - 1];
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
		this.score = Math.max(0, this.score + character.characterType.points);
		this.scoreText.setText(`Puntuación: ${this.score}`);
		this.hideCharacter(holeIndex);
	}
}
