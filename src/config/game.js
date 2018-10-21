const generateScreen = (containerId, canvasId, fullscreenId, createContainer) => {
	const canvasElt = document.createElement('canvas');
	canvasElt.id = canvasId;
	canvasElt.height = '768';
	canvasElt.width = '1280';
	if (createContainer) {
		const containerElt = document.createElement('div');
		containerElt.id = containerId;
		containerElt.appendChild(canvasElt);
		document.body.appendChild(containerElt);
	} else {
		const containerElt = document.getElementById(containerId);
		containerElt.id = containerId;
		containerElt.appendChild(canvasElt);
	}
	const fullscreenElt = document.createElement('span');
	fullscreenElt.id = fullscreenId;
	document.body.appendChild(fullscreenElt);
};

const infiniteLoop = () => {
	if (!window.requestAnimFrame) {
		window.requestAnimFrame = (() => window.requestAnimationFrame
				|| window.webkitRequestAnimationFrame
				|| window.mozRequestAnimationFrame
				|| window.oRequestAnimationFrame
				|| window.msRequestAnimationFrame
				|| function timeout(callback) {
					window.setTimeout(callback, 1000 / 60);
				}
		)();
	}
};

const maximizeScreen = (containerId, canvasId) => {
	const canvasElt = document.getElementById(canvasId);
	const initialWidth = canvasElt.offsetWidth;
	const initialHeight = canvasElt.offsetHeight;
	if (document.body.clientWidth * (initialHeight / initialWidth) < document.body.clientHeight) {
		canvasElt.style.width = '100%';
		canvasElt.style.height = 'auto';
	} else {
		canvasElt.style.height = '100%';
		canvasElt.style.width = 'auto';
	}
};

const datePolyfill = () => {
	if (!Date.now) Date.now = () => new Date().getTime();
};


const screenResizeEvents = (containerId, canvasId, fullscreenId) => {
	const canvasElt = document.getElementById(canvasId);
	const consoleElt = document.getElementById(containerId);
	const fullscreenElt = document.getElementById(fullscreenId);
	const initialWidth = canvasElt.offsetWidth;
	const initialHeight = canvasElt.offsetHeight;
	// ********** Resize **********
	window.addEventListener('resize', () => {
		if (document.body.clientWidth * (initialHeight / initialWidth) < document.body.clientHeight) {
			canvasElt.style.width = '100%';
			canvasElt.style.height = 'auto';
		} else {
			canvasElt.style.height = '100%';
			canvasElt.style.width = 'auto';
		}
	});


	// ********** FullScreen **********
	fullscreenElt.addEventListener('touchend', (e) => {
		e.preventDefault();
		if (
			!document.fullscreenElement
			&& !document.mozFullScreenElement
			&& !document.webkitFullscreenElement
		) {
			if (consoleElt.requestFullscreen) {
				consoleElt.requestFullscreen();
			} else if (consoleElt.mozRequestFullScreen) {
				consoleElt.mozRequestFullScreen();
			} else if (consoleElt.webkitRequestFullscreen) {
				consoleElt.webkitRequestFullscreen();
			}
		} else if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}, true);

	fullscreenElt.addEventListener('click', (e) => {
		e.preventDefault();
		if (
			!document.fullscreenElement
			&& !document.mozFullScreenElement
			&& !document.webkitFullscreenElement
		) {
			if (consoleElt.requestFullscreen) {
				consoleElt.requestFullscreen();
			} else if (consoleElt.mozRequestFullScreen) {
				consoleElt.mozRequestFullScreen();
			} else if (consoleElt.webkitRequestFullscreen) {
				consoleElt.webkitRequestFullscreen();
			}
		} else if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	});
};

/**
 * Initializes the general configuration of the engine.
 * View, screen, infinite loop...
 * @param {string} containerId - Id of the canvas container
 * @param {string} canvasId - Id of the canvas
 * @param {string} fullscreenId - Id of the fullscreen button element
 * @param {boolean} [createContainer = false] - If true, the engine will generate a container in the body
*/
const _initConfig = (containerId, canvasId, fullscreenId, createContainer = false) => {
	/* ******************* GLOBAL FUNCTION *********************** */
	generateScreen(containerId, canvasId, fullscreenId, createContainer);
	infiniteLoop();
	datePolyfill();
	maximizeScreen(containerId, canvasId);
	screenResizeEvents(containerId, canvasId, fullscreenId);
};

export default _initConfig;
