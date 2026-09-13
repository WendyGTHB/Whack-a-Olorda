// Escena de fin de partida: muestra la puntuación y el récord (Tareas 9-10)
// y permite volver a jugar o ir al inicio (Tarea 11).
const HIGHSCORE_KEY = 'whackAOlordaHighscore';

class GameOverScene extends Phaser.Scene {
	constructor() {
		super('GameOverScene');
	}

	init(data) {
		this.score = data.score || 0;
	}

	create() {
		const highscore = this.updateHighscore(this.score);

		this.add.image(640, 360, 'bg-gameover').setDisplaySize(1280, 720);

		this.add.text(640, 280, 'Game Over', titleTextStyle('48px')).setOrigin(0.5);

		this.add.text(
			640,
			360,
			`Puntuación: ${this.score}`,
			bodyTextStyle('32px'),
		).setOrigin(0.5);

		this.add.text(
			640,
			410,
			`Récord: ${highscore}`,
			bodyTextStyle('32px'),
		).setOrigin(0.5);

		const restartButton = createButton(
			this,
			640,
			480,
			'Jugar de nuevo',
			THEME.colors.buttonPositive,
			{ width: 340 },
		);

		restartButton.on('pointerdown', () => {
			this.scene.start('GameScene');
		});

		const menuButton = createButton(
			this,
			640,
			570,
			'Volver al inicio',
			THEME.colors.buttonNeutral,
			{ width: 340 },
		);

		menuButton.on('pointerdown', () => {
			this.scene.start('StartScene');
		});
	}

	updateHighscore(score) {
		const stored = parseInt(localStorage.getItem(HIGHSCORE_KEY), 10);
		const previousHighscore = Number.isNaN(stored) ? 0 : stored;

		if (score > previousHighscore) {
			localStorage.setItem(HIGHSCORE_KEY, String(score));
			return score;
		}

		return previousHighscore;
	}
}
