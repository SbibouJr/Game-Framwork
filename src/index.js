import config from "./config/config";
import Game from "./class/Game"

window.addEventListener("load",(e) => {

	config();
	let game = new Game();
	//game.loop( () => {});

	game.run();


});
