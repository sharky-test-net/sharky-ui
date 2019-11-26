'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/hello', (req, res) => {
  res.send('Hello, world! :) 1\n');
});
app.use(express.static('dist/sharky-ui'))

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
