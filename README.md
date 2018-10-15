# Sbjr-Game-Framwork

**A javascript game framwork.**

<h2 align="center">Install</h2>

*npm :*
```bash
npm i -S sbjr-game-framwork
```
<h2 align="center">Usage</h2>

```js
import Game from "sbjr-game-framwork";

window.addEventListener('load',() => {

	const game = new Game();

	// The Game object has a loop () function that takes into account a
	// callback function that will be called at 60fps. If loop (callback);
	// is not defined, the Game object will use a function by default.
	game.loop(() => {
		game.drawRect('yellow', 20, 10, 360, 100);
		game.drawText('Game exemple', 20, 20, 'RED', game.FONT_SIZE_MD);
	});
	game.run();
});

```

**Have fun.**
