// Paleta de colores y estilos de texto compartidos (Tarea 15.2), acordes al
// arte ilustrado de pradera de los fondos integrados en la Tarea 15.1.
const THEME = {
	colors: {
		textPrimary: '#fff8e1',
		textStroke: '#3e2723',
		accent: '#ffca28',
		buttonPositive: '#2e7d32',
		buttonNeutral: '#5d4037',
		buttonNegative: '#b71c1c',
		buttonInfo: '#7b5fb3',
	},
	fontFamily: '"Comic Sans MS", "Trebuchet MS", "Segoe UI", sans-serif',
};

// Estilo para títulos destacados (título del juego, "Pausa", "Game Over").
function titleTextStyle(fontSize) {
	return {
		fontFamily: THEME.fontFamily,
		fontSize,
		color: THEME.colors.accent,
		stroke: THEME.colors.textStroke,
		strokeThickness: 6,
	};
}

// Estilo para texto informativo (marcador, temporizador, mensajes).
function bodyTextStyle(fontSize, options = {}) {
	return {
		fontFamily: THEME.fontFamily,
		fontSize,
		color: THEME.colors.textPrimary,
		stroke: THEME.colors.textStroke,
		strokeThickness: 4,
		...options,
	};
}

// Aclara (percent > 0) u oscurece (percent < 0) un color hexadecimal.
function shadeColor(hexColor, percent) {
	const color = Phaser.Display.Color.HexStringToColor(hexColor);
	const factor = 1 + percent / 100;
	const clamp = (value) => Phaser.Math.Clamp(Math.round(value * factor), 0, 255);
	return Phaser.Display.Color.GetColor(
		clamp(color.red),
		clamp(color.green),
		clamp(color.blue),
	);
}

// Crea un botón sin sprites: fondo redondeado con sombra dibujado con
// Graphics, texto encima y estados hover/pressed (Tarea 15.6). El `anchor`
// 'top' posiciona (x, y) en el borde superior del botón en lugar de su
// centro, útil para reproducir el maquetado previo del botón de pausa.
function createButton(scene, x, y, label, backgroundColor, options = {}) {
	const {
		fontSize = '32px',
		paddingX = 28,
		paddingY = 14,
		anchor = 'center',
		width: fixedWidth,
	} = options;

	const text = scene.add.text(0, 0, label, {
		fontFamily: THEME.fontFamily,
		fontSize,
		color: THEME.colors.textPrimary,
		stroke: THEME.colors.textStroke,
		strokeThickness: 3,
	}).setOrigin(0.5);

	// `width` permite forzar el mismo ancho en varios botones (p. ej. cuando
	// sus textos tienen longitudes distintas) en lugar de ajustarlo al texto.
	const width = fixedWidth || text.width + paddingX * 2;
	const height = text.height + paddingY * 2;
	const radius = Math.min(18, height / 2);
	const offsetY = anchor === 'top' ? height / 2 : 0;

	text.setY(offsetY);

	const shadow = scene.add.graphics();
	shadow.fillStyle(0x000000, 0.35);
	shadow.fillRoundedRect(-width / 2 + 3, -height / 2 + offsetY + 5, width, height, radius);

	const baseColor = Phaser.Display.Color.HexStringToColor(backgroundColor).color;
	const hoverColor = shadeColor(backgroundColor, 15);
	const pressColor = shadeColor(backgroundColor, -15);

	const background = scene.add.graphics();
	const drawBackground = (color) => {
		background.clear();
		background.fillStyle(color, 1);
		background.fillRoundedRect(-width / 2, -height / 2 + offsetY, width, height, radius);
	};
	drawBackground(baseColor);

	const button = scene.add.container(x, y, [shadow, background, text]);
	button.setSize(width, height);

	// Un Container no tiene origen propio, así que un hitArea manual con
	// coordenadas centradas (como el fondo dibujado) no coincide con lo que
	// espera el sistema de input de Phaser y el área clickable queda
	// desplazada, sobre todo al reescalar en modo responsive. En su lugar,
	// se añade una Zone hija invisible con origen 0.5: Phaser ya calcula
	// bien su área centrada y su transformación dentro del Container.
	const hitZone = scene.add.zone(0, offsetY, width, height);
	hitZone.setInteractive({ useHandCursor: true });
	button.add(hitZone);

	['pointerover', 'pointerout', 'pointerdown', 'pointerup'].forEach((eventName) => {
		hitZone.on(eventName, (...args) => button.emit(eventName, ...args));
	});

	button.on('pointerover', () => drawBackground(hoverColor));
	button.on('pointerout', () => drawBackground(baseColor));
	button.on('pointerdown', () => drawBackground(pressColor));
	button.on('pointerup', () => drawBackground(hoverColor));

	// GameScene activa/desactiva el botón de pausa mientras el juego está en
	// pausa; se redirige a la Zone real, que es la que tiene el input.
	button.disableInteractive = () => hitZone.disableInteractive();
	button.setInteractive = () => hitZone.setInteractive({ useHandCursor: true });

	return button;
}
