tagsRouter = require('express').Router();
const { getAllTags, getLinksByTagName } = require('../db');


tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");
    next();
});

tagsRouter.get('/', async (req, res) => {
    try {
        const tags = await getAllTags();
        res.send({
            tags   
        }); 
    } catch (error) {
        throw error
    };
});

tagsRouter.get('/:tagName/links', async (req, res, next) => {
    const { tagName } = req.params;
    console.log(tagName)
    try {
        const linksWithTagName = await getLinksByTagName(tagName);
        
        res.send({ linksWithTagName });

    } catch ({ name, message }) {
        next({ name, message });
    };
});

module.exports = tagsRouter;