import config from "./config/config";
import Game from "./class/Game";
import "./style.css";

window.addEventListener("load",(e) => {

	config();

	let game = new Game();

	// UNCOMENT AND START CODING
	/*game.loop( () => {

	});*/

	game.run();


});
