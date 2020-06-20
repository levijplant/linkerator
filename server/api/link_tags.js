linkTagsRouter = require('express').Router();

const { getlinkTagById } = require('../db');

linkTagsRouter.use((req, res, next) => {
    console.log("A request is being made to /link_tags");
    next();
});

linkTagsRouter.delete('/:linkTagId', async (req, res, next) => {
    const { linkTagId } = req.params;
    console.log(linkTagId);

    try {
        const { rows: [ link_tag ] } = await client.query(`
        SELECT * 
        FROM link_tags
        JOIN links ON link_tags."urlId" = links.id
        AND link_tags.id = $1;
    `, [ linkTagId ]);

        const linkTag = await getlinkTagById(linkTagId);

        if (linkTag) {
            await deleteLinkTag(linkTagId);
            res.send('Tag has been deleted from link!');
        };

    } catch ({ name, message }) {
        next({ name, message })
    };
});

module.exports = linkTagsRouter;