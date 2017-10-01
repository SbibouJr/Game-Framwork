# Test-Corporate

**A NodeJS Project for training.**

<h2 align="center">Install</h2>

```bash
npm i
```
<h2 align="center">Developement</h2>

To start the development server:

```bash
npm start
```

To access the app, go to this address <a href="http://localhost:8080">localhost:8080</a>

You can start client code in the **/src/index.js** file :

```js
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

```

You can start server code in the **/src-server/index.js** file :

```js
let express = require('express');
let app = express();

const PUBLIC_PATH = './public';
const PORT = 3000;

console.log(`
Starting server...

This server return the public directory : ${PUBLIC_PATH}
and listen to the port : ${PORT}
`);

app.use(express.static(PUBLIC_PATH));
app.listen(PORT);
```

<h2 align="center">Production</h2>

Once satisfied, you can build the project in the **/dist** folder with it the command :

```bash
npm build
```
Your **/dist** file should look like this :

```bash
server-bundle.js
public/
  bundle.js
  index.html
  style.css
```

To start the server, go to the **/dist** directory and run the command :

```bash
cd dist
node server-bundle.js
```

To access the app, go to this address <a href="http://localhost:3000">localhost:3000</a>

**Have fun.**
