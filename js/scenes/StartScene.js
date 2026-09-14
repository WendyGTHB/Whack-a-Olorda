// Pantalla de inicio con título y botón Start (Tarea 3).
class StartScene extends Phaser.Scene {
	constructor() {
		super('StartScene');
	}

	create() {
		this.add.image(640, 360, 'bg-start').setDisplaySize(1280, 720);

		this.add.text(640, 240, 'Whack-a-Olorda', titleTextStyle('64px')).setOrigin(0.5);

		this.startButton = createButton(
			this,
			640,
			360,
			'Start',
			THEME.colors.buttonPositive,
			{ fontSize: '40px' },
		);

		this.startButton.on('pointerdown', () => {
			this.scene.start('GameScene');
		});

		this.helpButton = createButton(
			this,
			1200,
			60,
			'?',
			THEME.colors.buttonInfo,
			{ fontSize: '32px', paddingY: 10, width: 56 },
		);
		this.helpButton.on('pointerdown', () => this.showHelpPanel());
	}

	// Panel de instrucciones con el objetivo del juego y la puntuación de
	// cada personaje, mostrado bajo demanda desde el botón de ayuda
	// (Tarea 16). Reutiliza CHARACTER_TYPES (Tarea 8) para no duplicar los
	// valores de puntuación.
	showHelpPanel() {
		this.startButton.disableInteractive();
		this.helpButton.disableInteractive();

		const background = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.7);
		const title = this.add.text(640, 130, 'Cómo jugar', titleTextStyle('44px')).setOrigin(0.5);

		const objective = this.add.text(
			640,
			200,
			'Haz clic sobre los personajes antes de que se acabe el tiempo.\n¡Evita la bomba!',
			bodyTextStyle('24px', { align: 'center' }),
		).setOrigin(0.5);

		const legendTitle = this.add.text(
			640,
			320,
			'Puntuación de cada personaje',
			bodyTextStyle('26px'),
		).setOrigin(0.5);

		const legendItems = [];
		const startX = 260;
		const spacing = 253;

		CHARACTER_TYPES.forEach((type, index) => {
			const x = startX + spacing * index;
			const pointsLabel = type.points > 0 ? `+${type.points}` : `${type.points}`;

			legendItems.push(this.add.image(x, 410, type.sprite).setDisplaySize(120, 120));
			legendItems.push(this.add.text(x, 490, pointsLabel, bodyTextStyle('28px')).setOrigin(0.5));
		});

		const closeButton = createButton(
			this,
			640,
			560,
			'Cerrar',
			THEME.colors.buttonNeutral,
		);
		closeButton.on('pointerdown', () => this.hideHelpPanel());

		this.helpOverlay = this.add.container(
			0,
			0,
			[background, title, objective, legendTitle, ...legendItems, closeButton],
		);
	}

	hideHelpPanel() {
		this.helpOverlay.destroy();
		this.startButton.setInteractive();
		this.helpButton.setInteractive();
	}
}
