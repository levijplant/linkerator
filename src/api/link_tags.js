linkTagsRouter = require('express').Router();

linkTagsRouter.use((req, res, next) => {
    console.log("A request is being made to /link_tags");
    next();
});

module.exports = linkTagsRouter;