// Escena de fin de partida: muestra la puntuación y el récord (Tareas 9-10).
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

		this.add.text(640, 280, 'Game Over', {
			fontSize: '48px',
			color: '#ffffff',
		}).setOrigin(0.5);

		this.add.text(640, 360, `Puntuación: ${this.score}`, {
			fontSize: '32px',
			color: '#ffffff',
		}).setOrigin(0.5);

		this.add.text(640, 410, `Récord: ${highscore}`, {
			fontSize: '32px',
			color: '#ffffff',
		}).setOrigin(0.5);
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
