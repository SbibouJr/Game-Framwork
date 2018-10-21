# Sbjr-Game-Framwork

**A basic game framwork written in javascript.**

[Documentation](https://sbjr-game-framwork-docs.netlify.com/)

## Install

**CDN :**
```js
<script type="text/javascript" src="https://unpkg.com/sbjr-game-framwork@latest"></script>
```

**npm :**
```bash
npm i -S sbjr-game-framwork
```
## Usage

```js
import Game, { FONT_SIZE } from 'sbjr-game-framwork';

window.addEventListener('load',() => {

	// Create a Game object that will manage the application
	// The manufacturer can take three parameters.
	const game = new Game(
		true,					// If true, activate the debug mode
		'My App', 		// The name of the application
		null, // The id of the element of the Dom that will be used as a container. If null, the engine will generate one inside the body
	);

	// The Game object has a loop () function that takes into account a
	// callback function that will be called at 60fps. If loop (callback);
	// is not defined, the Game object will use a function by default for example.
	game.loop(() => {
		game.drawRect('yellow', 20, 10, 360, 100);
		game.drawText('Game exemple', 20, 20, 'RED', FONT_SIZE.MD);
	});
	game.run();
});
```

**Have fun.**
