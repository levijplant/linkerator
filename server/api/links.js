const { createLink, getAllLinks } = require('../db/links');

linksRouter = require('express').Router();

linksRouter.use((req, res, next) => {
    console.log("A request is being made to /links");
    next();
});

linksRouter.get('/', async (req, res, next) => {
    try {
        const links = await getAllLinks();

        res.send({ links });
    } catch (error) {
        throw error;
    }
});

linksRouter.post('/', async (req, res, next) => {
    try {
        const { url, comment, date, count } = req.body;
        const newLink = await createLink(url, comment, date, count);

        if (newLink) {
            res.send({ newLink });
        } else {
            next({
                name: "AddLinkError",
                message: "There was and error adding a link to the database."
            });
        };

    } catch ({ name, message }) {
        next({ name, message })
    };
});



module.exports = linksRouter;