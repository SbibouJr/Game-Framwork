import config from "./config/config";
import Game from "./class/Game";
import "./style.css";

window.addEventListener("load",(e) => {

	config();

	let game = new Game();

	// UNCOMMENT AND START CODING
	// The Game object has a loop () function that takes into account a 
	// callback function that will be called at 60fps. If loop (callback);
	// is not defined, the Game object will use a function by default. 

	/*
	game.loop( () => {

		let image = game.createImage("./assets/img/marsattakStudioGame.png");
		game.drawImage(image, 0, 0);
		game.drawRect("yellow", 20, 10, 360, 100);
		game.drawText("Game exemple", 20, 20, "RED", game.FONT_SIZE_MD);

	});
	*/

	game.run();


});
