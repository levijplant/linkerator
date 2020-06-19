linksRouter = require('express').Router();

linksRouter.use((req, res, next) => {
    console.log("A request is being made to /links");
    next();
});

module.exports = linksRouter;