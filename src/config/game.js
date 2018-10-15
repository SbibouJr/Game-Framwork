const generateScreen = (containerTag, canvasTag, fullscreenTag, createContainer) => {
	const canvasElt = document.createElement('canvas');
	canvasElt.id = canvasTag;
	canvasElt.height = '768';
	canvasElt.width = '1280';
	if (createContainer) {
		const containerElt = document.createElement('div');
		containerElt.id = containerTag;
		containerElt.appendChild(canvasElt);
		document.body.appendChild(containerElt);
	} else {
		const containerElt = document.getElementById(containerTag);
		containerElt.id = containerTag;
		containerElt.appendChild(canvasElt);
	}
	const fullscreenElt = document.createElement('span');
	fullscreenElt.id = fullscreenTag;
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

const maximizeScreen = (containerTag, canvasTag) => {
	const canvasElt = document.getElementById(canvasTag);
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


const screenResizeEvents = (containerTag, canvasTag, fullscreenTag) => {
	const canvasElt = document.getElementById(canvasTag);
	const consoleElt = document.getElementById(containerTag);
	const fullscreenElt = document.getElementById(fullscreenTag);
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

const initConfig = (containerTag, canvasTag, fullscreenTag, createContainer = false) => {
	/* ******************* GLOBAL FUNCTION *********************** */
	generateScreen(containerTag, canvasTag, fullscreenTag, createContainer);
	infiniteLoop();
	datePolyfill();
	maximizeScreen(containerTag, canvasTag);
	screenResizeEvents(containerTag, canvasTag, fullscreenTag);
};

export default initConfig;
