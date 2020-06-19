const express = require('express');
const chalk = require('chalk');
const path = require('path');

const PORT = process.env.PORT || 3000;
const server = express();
//*****IS THIS THE CORRECT WAY TO GET TO THE FOLDER I'M TRYIN TO REACH?*****/
const client = require('../../src/db/client');
client.connect();

server.listen(PORT, () => {
    console.log(chalk.orange(`Server is listening on PORT: ${PORT}`))
});

server.use(express.json());
//*****THIS TOO!!!*****/
server.use(express.static(path.join(__dirname, '../../public')));

const morgan = require('morgan');
server.use(morgan('dev'));

server.use((req, res, next) => {
    console.log("<----Body Logger START---->");
    console.log(req.body);
    console.log("<----Body Logger END---->");

    next();
});

const apiRouter = require('../api');
server.use('/api', apiRouter);