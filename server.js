const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./route');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');


const app = express();

const PORT = 5000 || process.env.PORT;

app.use(bodyParser.json());

app.use('', routes);
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});