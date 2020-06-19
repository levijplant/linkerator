const express = require('express');
const chalk = require('chalk');
const path = require('path');

const PORT = process.env.PORT || 3000;
const server = express();

const apiRouter = require('./api/index.js');
const morgan = require('morgan');
const { buildDB } = require('./db/seed.js');

server.use(morgan('dev'));

//*****THIS TOO!!!*****/
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.json());



server.use((req, res, next) => {
    console.log("<----Body Logger START---->");
    console.log(req.body);
    console.log("<----Body Logger END---->");

    next();
});


server.use('/api', apiRouter);
buildDB().then(() => {
    server.listen(PORT, () => {
        console.log(chalk.green(`Server is listening on PORT: ${PORT}`))
    });
})
    .catch((error) => {
        console.log(chalk.red("error", error))
    });


