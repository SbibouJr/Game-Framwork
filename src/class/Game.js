import imgTest from '../assets/img/marsattakStudioGame.png';
import initConfig from '../config/game';
import { FONT_SIZE, FONT_TYPE } from '../config/texts';

class Game {
	constructor(debugMode = false, title = 'SbJr-Game-Framwork Project', containerTag = false) {
		this.debugMode = debugMode;
		this.title = title;
		this.containerTag = !containerTag ? 'screen_container' : containerTag;
		this.canvasTag = 'screen';
		this.fullscreenTag = 'fullscreen';

		// Game setting
		initConfig(this.containerTag, this.canvasTag, this.fullscreenTag, !!this.containerTag);

		// Get Elements
		this.consoleElt = document.getElementById(this.containerTag);
		this.canvasElt = document.getElementById(this.canvasTag);


		this.contextElt = this.canvasElt.getContext('2d');
		this.moveX = 0;
		this.moveY = 0;
	}

	_callbackLoop() {
		const imgExemple = Game.createImage(imgTest);
		this.drawImage(imgExemple, this.canvasElt.width / 2 - imgExemple.width / 2, 0);
		this.drawText(this.title, 0, this.canvasElt.height - 120, 'white', FONT_SIZE.MD);
	}

	_mainLoop() {
		this.contextElt.save();
		this.contextElt.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height);
		this._callbackLoop();
		// DEBUG MESSAGE
		if (this.debugMode) {
			this.drawRect('white', 0, 0, this.canvasElt.width, 100, 0.8);
			this.drawText(`Offset width : ${this.canvasElt.offsetWidth}`, 10, 10, 'black', FONT_SIZE.XS);
			this.drawText(`Offset height : ${this.canvasElt.offsetHeight}`, 10, 50, 'black', FONT_SIZE.XS);
		}
		this.contextElt.restore();
		window.requestAnimFrame(() => { this._mainLoop(this._callbackLoop); });
	}

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

	load() {
		this.contextElt.textBaseline = 'top';
	}

	drawText(text = 'Exemple text', x = 50, y = 50, color = 'black', size = FONT_SIZE.SM, alpha = 1, offsetXShadow = 0, offsetYShadow = 0, colorShadow = 'black', font = FONT_TYPE.DEFAULT) {
		this.contextElt.shadowColor = colorShadow;
		this.contextElt.shadowOffsetX = offsetXShadow;
		this.contextElt.shadowOffsetY = offsetYShadow;
		this.contextElt.globalAlpha = alpha;
		this.contextElt.fillStyle = color;
		this.contextElt.font = `${size} ${font}`;
		this.contextElt.fillText(text, x, y);
	}

	drawImage(img, x = 0, y = 0, width = false, height = false) {
		this.contextElt.drawImage(img, x, y, !width ? img.width : width, !height ? img.height : height);
	}

	drawRect(color = 'black', x = 10, y = 10, width = 10, height = 10, alpha = 1) {
		this.contextElt.globalAlpha = alpha;
		this.contextElt.fillStyle = color;
		this.contextElt.fillRect(x, y, width, height);
	}

	loop(callback) {
		this._callbackLoop = callback;
	}

	run() {
		this.load();
		this._mainLoop();
	}
}

export default Game;
export {
	FONT_SIZE,
	FONT_TYPE,
};
