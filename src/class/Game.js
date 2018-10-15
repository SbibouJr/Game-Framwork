import imgTest from '../assets/img/marsattakStudioGame.png';
import initConfig from '../config/game';

class Game {
	constructor(title = 'SbJr-Game-Framwork Project', containerTag = false) {
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
		this.FONT_TYPE_DEFAULT = 'serif';
		this.FONT_SIZE_SM = '40px';
		this.FONT_SIZE_MD = '60px';
		this.FONT_SIZE_LG = '80px';
	}

	_callbackLoop() {
		const imgExemple = Game.createImage(imgTest);
		this.drawImage(imgExemple, this.canvasElt.width / 2 - imgExemple.width / 2, 0);
		this.drawText(this.title, 0, this.canvasElt.height - 120, 'white', this.FONT_SIZE_MD);
	}

	_mainLoop() {
		this.contextElt.save();
		this.contextElt.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height);
		this._callbackLoop();
		this.contextElt.restore();
		window.requestAnimFrame(() => { this._mainLoop(this._callbackLoop); });
	}

	static createImage(src) {
		const img = new Image();
		img.src = src;
		img.scale = (value) => {
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

	drawText(text = 'Exemple text', x = 50, y = 50, color = 'black', size = this.FONT_SIZE_SM, alpha = 1, offsetXShadow = 0, offsetYShadow = 0, colorShadow = 'black', font = this.FONT_TYPE_DEFAULT) {
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
