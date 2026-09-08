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

// Estilo para botones con fondo de color (Start, Pausa, Reanudar, etc.).
function buttonTextStyle(fontSize, backgroundColor, padding = { x: 24, y: 12 }) {
	return {
		fontFamily: THEME.fontFamily,
		fontSize,
		color: THEME.colors.textPrimary,
		stroke: THEME.colors.textStroke,
		strokeThickness: 3,
		backgroundColor,
		padding,
	};
}
