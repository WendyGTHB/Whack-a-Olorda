// Escena de juego: tablero con 6 agujeros (Tarea 4), marcador y
// temporizador (Tarea 5), aparición de personajes (Tarea 6),
// clic y puntuación del personaje normal (Tarea 7), tipos de
// personajes y probabilidades (Tarea 8), fin de partida (Tarea 9),
// pausa durante la partida (Tarea 12), confirmación al salir desde
// pausa (Tarea 13).
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
		this.add.image(640, 360, 'bg-game').setDisplaySize(1280, 720);

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

		this.scoreText = this.add.text(
			40,
			40,
			`Puntuación: ${this.score}`,
			bodyTextStyle('32px'),
		);

		this.timerText = this.add.text(
			1240,
			40,
			`Tiempo: ${this.timeLeft}`,
			bodyTextStyle('32px'),
		).setOrigin(1, 0);

		this.time.addEvent({
			delay: 1000,
			loop: true,
			callback: this.onTimerTick,
			callbackScope: this,
		});

		// Estado de ocupación de cada agujero y personaje visible en él.
		this.holeCharacters = new Array(this.holePositions.length).fill(null);

		this.spawnEvent = this.time.addEvent({
			delay: CHARACTER_SPAWN_DELAY,
			loop: true,
			callback: this.spawnCharacter,
			callbackScope: this,
		});

		this.isPaused = false;
		this.pauseButton = this.add.text(
			640,
			40,
			'Pausa',
			buttonTextStyle('28px', THEME.colors.buttonNeutral, { x: 16, y: 8 }),
		).setOrigin(0.5, 0).setInteractive({ useHandCursor: true });
		this.pauseButton.on('pointerdown', () => this.pauseGame());
	}

	onTimerTick() {
		if (this.timeLeft <= 0) {
			return;
		}

		this.timeLeft -= 1;
		this.timerText.setText(`Tiempo: ${this.timeLeft}`);

		if (this.timeLeft <= 0) {
			this.endGame();
		}
	}

	// Detiene la aparición de personajes y pasa a la pantalla de Game Over.
	endGame() {
		this.spawnEvent.remove();
		this.scene.start('GameOverScene', { score: this.score });
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

	// Detiene el temporizador y la aparición de personajes, y muestra el
	// menú de pausa. Los personajes visibles quedan congelados tal cual.
	pauseGame() {
		if (this.isPaused) {
			return;
		}

		this.isPaused = true;
		this.time.paused = true;
		this.pauseButton.disableInteractive();
		this.holeCharacters.forEach((character) => {
			if (character) {
				character.disableInteractive();
			}
		});

		this.showPauseMenu();
	}

	showPauseMenu() {
		const background = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.7);
		const title = this.add.text(640, 260, 'Pausa', titleTextStyle('48px')).setOrigin(0.5);

		const resumeButton = this.add.text(
			640,
			360,
			'Reanudar',
			buttonTextStyle('32px', THEME.colors.buttonPositive, { x: 20, y: 10 }),
		).setOrigin(0.5).setInteractive({ useHandCursor: true });
		resumeButton.on('pointerdown', () => this.resumeGame());

		const exitButton = this.add.text(
			640,
			440,
			'Salir al inicio',
			buttonTextStyle('32px', THEME.colors.buttonNegative, { x: 20, y: 10 }),
		).setOrigin(0.5).setInteractive({ useHandCursor: true });
		exitButton.on('pointerdown', () => this.showExitConfirmation());

		this.pauseOverlay = this.add.container(0, 0, [background, title, resumeButton, exitButton]);
	}

	// Muestra la confirmación antes de descartar la partida desde la pausa.
	showExitConfirmation() {
		const background = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.85);
		const message = this.add.text(
			640,
			320,
			'¿Seguro que quieres salir?\nPerderás el progreso de esta partida.',
			bodyTextStyle('28px', { align: 'center' }),
		).setOrigin(0.5);

		const confirmButton = this.add.text(
			520,
			420,
			'Salir',
			buttonTextStyle('32px', THEME.colors.buttonNegative, { x: 20, y: 10 }),
		).setOrigin(0.5).setInteractive({ useHandCursor: true });
		confirmButton.on('pointerdown', () => this.exitToStart());

		const cancelButton = this.add.text(
			760,
			420,
			'Cancelar',
			buttonTextStyle('32px', THEME.colors.buttonNeutral, { x: 20, y: 10 }),
		).setOrigin(0.5).setInteractive({ useHandCursor: true });
		cancelButton.on('pointerdown', () => this.hideExitConfirmation());

		this.exitConfirmOverlay = this.add.container(
			0,
			0,
			[background, message, confirmButton, cancelButton],
		);
	}

	// Cierra la confirmación de salida y mantiene la partida en pausa.
	hideExitConfirmation() {
		if (!this.exitConfirmOverlay) {
			return;
		}

		this.exitConfirmOverlay.destroy();
		this.exitConfirmOverlay = null;
	}

	// Reanuda la partida exactamente donde se quedó: temporizador y
	// aparición de personajes vuelven a activarse.
	resumeGame() {
		if (!this.isPaused) {
			return;
		}

		this.isPaused = false;
		this.time.paused = false;
		this.pauseButton.setInteractive();
		this.holeCharacters.forEach((character) => {
			if (character) {
				character.setInteractive();
			}
		});

		this.pauseOverlay.destroy();
		this.pauseOverlay = null;
	}

	// Descarta la partida en curso y vuelve a la pantalla de inicio.
	exitToStart() {
		this.spawnEvent.remove();
		this.scene.start('StartScene');
	}
}
