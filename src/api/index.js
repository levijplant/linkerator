const apiRouter = require('express').Router();

const linksRouter = require('./links');
apiRouter.use('/links', linksRouter);

const tagsRouter = require('./tags');
apiRouter.use('/tags', tagsRouter);

const linkTagsRouter = require('./link_tags');
apiRouter.use('/link_tags', linkTagsRouter);

apiRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports = apiRouter;