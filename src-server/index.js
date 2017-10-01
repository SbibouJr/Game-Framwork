let express = require('express');
let app = express();

const PUBLIC_PATH = '../dist-dev/';
const PORT = 3000;

console.log(`
Starting server...

This server return the public directory : ${PUBLIC_PATH}
and listen to the port : ${PORT}
`);

app.use(express.static(PUBLIC_PATH));
app.listen(PORT);