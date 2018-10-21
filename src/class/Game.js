import imgTest from '../assets/img/marsattakStudioGame.png';
import _initConfig from '../config/game';
import { FONT_SIZE, FONT_TYPE } from '../config/texts';

/**
 * This is the Game class.
 * She's the one who's going to manage the whole application
*/
class Game {
	/**
	 * @param {boolean} [debugMode = false] - Enable/disable the debug mode
	 * @param {string} [title = SbJr-Game-Framwork Project] - Application name
	 * @param {string} [containerId = null]- Id of the html element target container to inject the code
	*/
	constructor(debugMode = false, title = 'SbJr-Game-Framwork Project', containerId = null) {
		this._debugMode = debugMode;
		this._title = title;
		this._containerId = !containerId ? 'screen_container' : containerId;
		this._canvasId = 'screen';
		this._fullscreenId = 'fullscreen';

		// Game setting
		_initConfig(this._containerId, this._canvasId, this._fullscreenId, !!this._containerId);

		// Get Elements
		this._consoleElt = document.getElementById(this._containerId);
		this._canvasElt = document.getElementById(this._canvasId);


		this._contextElt = this._canvasElt.getContext('2d');
		this._moveX = 0;
		this._moveY = 0;
	}

	// ********************************************
	// ***************** STATIC *******************
	// ********************************************

	/**
	 * This function allows to create an Image Object
	 * @param {string} src - The relative or absolute path of the image
	 * @return {Object} - Return an Image Object
	*/
	static createImage(src) {
		const img = new Image();
		img.src = src;
		img.isLoad = false;
		img.addEventListener('load', () => {
			img.isLoad = true;
		});
		img.scale = (value) => {
			if (img.isLoad) {
				const lastWidth = img.width;
				const lastHeight = img.height;
				img.width = lastWidth * value;
				img.height = lastHeight * value;
			} else {
				img.addEventListener('load', () => {
					img.scale(value);
				});
			}
			const lastWidth = img.width;
			const lastHeight = img.height;
			img.width = lastWidth * value;
			img.height = lastHeight * value;
		};
		return img;
	}

	// ********************************************
	// ***************** PUBLIC *******************
	// ********************************************

	/**
	 * This function allows to draw a text
	 * @param {string} [text = Exemple text] - The text to display
	 * @param {number} [x = 50] - The X position of the text
	 * @param {number} [y = 50] - The Y position of the text
	 * @param {string} [color = black] - The color of the text in the css format (ex: '10px' or '100%')
	 * @param {string} [size = FONT_SIZE.SM] - The size of the text in the css format (ex: '10px' or '100%')
	 * @param {number} [alpha = 1] - The percentage of text transparency
	 * @param {number} [offsetXShadow = 0] - The X offset shadow of the text
	 * @param {number} [offsetYShadow = 0] - The Y offset shadow of the text
	 * @param {string} [colorShadow = black] - The color of the text shadow in the css format
	 * @param {string} [font = FONT_TYPE.DEFAULT] -  The font of the text
	*/
	drawText(text = 'Exemple text', x = 50, y = 50, color = 'black', size = FONT_SIZE.SM, alpha = 1, offsetXShadow = 0, offsetYShadow = 0, colorShadow = 'black', font = FONT_TYPE.DEFAULT) {
		this._contextElt.shadowColor = colorShadow;
		this._contextElt.shadowOffsetX = offsetXShadow;
		this._contextElt.shadowOffsetY = offsetYShadow;
		this._contextElt.globalAlpha = alpha;
		this._contextElt.fillStyle = color;
		this._contextElt.font = `${size} ${font}`;
		this._contextElt.fillText(text, x, y);
	}

	/**
	 * This function allows to draw an image
	 * @param {Object} img - Image Object to render
	 * @param {number} [x = 0] - The X position of the image
	 * @param {number} [y = 0] - The Y position of the image
	 * @param {number} [width = null] - The width of the image
	 * @param {number} [height = null] - The height of the image
	*/
	drawImage(img, x = 0, y = 0, width = null, height = null) {
		this._contextElt.drawImage(img, x, y, !width ? img.width : width, !height ? img.height : height);
	}

	/**
	 * This function allows to draw a rectangle
	 * @param {string} color - Background color to the rectangle
	 * @param {number} [x = 10] - The X position of the rectangle
	 * @param {number} [y = 10] - The Y position of the rectangle
	 * @param {number} [width = 10] - The width of the rectangle
	 * @param {number} [height = 10] - The height of the rectangle
	 * @param {number} [alpha = 1] - Alpha of the rectangle 1 = opaque, 0 = transparent
	*/
	drawRect(color = 'black', x = 10, y = 10, width = 10, height = 10, alpha = 1) {
		this._contextElt.globalAlpha = alpha;
		this._contextElt.fillStyle = color;
		this._contextElt.fillRect(x, y, width, height);
	}

	/**
	 * This function allows to define the function of the main infiny loop
	 * @param {function()} callback - function to be added to the engine
	*/
	loop(callback) {
		this._loop = callback;
	}

	/**
	 * This function allows you to launch the application
	*/
	run() {
		this._load();
		this._mainLoop();
	}

	// ********************************************
	// **************** PRIVATE *******************
	// ********************************************

	_load() {
		this._contextElt.textBaseline = 'top';
	}

	_loop() {
		const imgExemple = Game.createImage(imgTest);
		this.drawImage(imgExemple, this._canvasElt.width / 2 - imgExemple.width / 2, 0);
		this.drawText(this._title, 0, this._canvasElt.height - 120, 'white', FONT_SIZE.MD);
	}

	_mainLoop() {
		this._contextElt.save();
		this._contextElt.clearRect(0, 0, this._canvasElt.width, this._canvasElt.height);
		this._loop();
		// DEBUG MESSAGE
		if (this._debugMode) {
			this.drawRect('white', 0, 0, this._canvasElt.width, 100, 0.8);
			this.drawText(`Offset width : ${this._canvasElt.offsetWidth}`, 10, 10, 'black', FONT_SIZE.XS);
			this.drawText(`Offset height : ${this._canvasElt.offsetHeight}`, 10, 50, 'black', FONT_SIZE.XS);
		}
		this._contextElt.restore();
		window.requestAnimFrame(() => { this._mainLoop(this._loop); });
	}
}

export default Game;
export {
	FONT_SIZE,
	FONT_TYPE,
};
