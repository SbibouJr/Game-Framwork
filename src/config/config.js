export default function(){
	/* ******************* GLOBAL FUNCTION *********************** */

	window.requestAnimFrame = (function(){
		return window.requestAnimationFrame       || // La forme standardisée
		window.webkitRequestAnimationFrame || // Pour Chrome et Safari
		window.mozRequestAnimationFrame    || // Pour Firefox
		window.oRequestAnimationFrame      || // Pour Opera
		window.msRequestAnimationFrame     || // Pour Internet Explorer
		function(callback){                   // Pour les mauvais
			window.setTimeout(callback, 1000 / 60);
		};
	})();
	if (!Date.now) {
	    Date.now = function now() {
	        return new Date().getTime();
	    };
	}

	/* ****************************************************
	***************** MAXIMIZE THE SCREEN *****************
	**************************************************** */

	let initialWidth = document.getElementById("screen").offsetWidth;
	let initialHeight = document.getElementById("screen").offsetHeight;
	let canvasElt = document.getElementById("screen");
	let consoleElt = document.getElementById("console");
	if(document.body.clientWidth*(initialHeight / initialWidth) < document.body.clientHeight){
		canvasElt.style.width = "100%";
		canvasElt.style.height = "auto";
	}
	else{
		canvasElt.style.height = "100%";
		canvasElt.style.width = "auto";
	}


	// ********** Resize **********
	window.addEventListener("resize",function(e){

		if(document.body.clientWidth*(initialHeight / initialWidth) < document.body.clientHeight){
			canvasElt.style.width = "100%";
			canvasElt.style.height = "auto";
		}
		else{
			canvasElt.style.height = "100%";
			canvasElt.style.width = "auto";
		}
	});


	// ********** FullScreen **********
	document.getElementById("fullscreen").addEventListener('touchend', function(e){
		e.preventDefault();
		let touches = e.changedTouches;
		if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement){
			if(consoleElt.requestFullscreen) {
				consoleElt.requestFullscreen();
			}
			else if(consoleElt.mozRequestFullScreen) {
				consoleElt.mozRequestFullScreen();
			}
			else if(consoleElt.webkitRequestFullscreen) {
				consoleElt.webkitRequestFullscreen();
			}
		}
		else{
			if(document.cancelFullScreen) {
				document.cancelFullScreen();
			}
			else if(document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}
			else if(document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}		
	}, true);

	document.getElementById("fullscreen").addEventListener("click",function(e){
		e.preventDefault();
		if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement){
			if(consoleElt.requestFullscreen) {
				consoleElt.requestFullscreen();
			}
			else if(consoleElt.mozRequestFullScreen) {
				consoleElt.mozRequestFullScreen();
			}
			else if(consoleElt.webkitRequestFullscreen) {
				consoleElt.webkitRequestFullscreen();
			}
		}
		else{
			if(document.cancelFullScreen) {
				document.cancelFullScreen();
			}
			else if(document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}
			else if(document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}
	});
}