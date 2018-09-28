const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const user = require('./api/user');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', user);

app.listen(3000, () => {console.log('server is running');});

module.exports = app;