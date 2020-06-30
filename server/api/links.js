const { createLink, updateLink, getAllLinks, getLinkById, deleteLink } = require('../db/links');
const { createTags, getTagsByLinkId } = require('../db/tags');
const { createLinkTag } = require('../db/link_tags');
const { SplitChunksPlugin } = require('webpack');

linksRouter = require('express').Router();

linksRouter.use((req, res, next) => {
    console.log("A request is being made to /links");
    next();
});


linksRouter.get('/', async (req, res, next) => {
    try {
        const links = await getAllLinks();

        for (let link of links) {
            link.tags = await getTagsByLinkId(link.id);
        };

        console.log("All Links: ", links);
        res.send({ links });
    } catch (error) {
        throw error;
    }
});

linksRouter.post('/', async (req, res, next) => {
    try {
        const { name, url, comment, date, count, tags = [] } = req.body;
        const tagArr = tags.trim().toLowerCase().split(/\s+/);
        
        const link = await createLink(name, url, comment, date, count);
        const tagList = await createTags(tagArr);
        
        await Promise.all(tagList.map(tag => {
            const link_tag = createLinkTag(link.id, tag.id);
            return link_tag;
        }));

        console.log(">>>TAGLIST<<<", tagList);
        link.tags = tagList;

        if (link) {
            res.send({ link });
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

linksRouter.patch('/:linkId', async (req, res, next) => {
    const { linkId } = req.params;
    const { comment, count, tags = [] } = req.body;

    const updateFields = {};

    if (tags && tags.length > 0) {
        updateFields.tags = tags;
    };

    if (comment) {
        updateFields.comment = comment;
    };

    if (count) {
        updateFields.count = count;
    };
    
    try {
        const originalLink = await getLinkById(linkId);
        console.log("Original Link: ", originalLink);

        if(originalLink) {
            const updatedLink = await updateLink(linkId, updateFields);
            res.send({ link: updatedLink });
        };
    } catch ({ name, message }) {
        next({ 
            name: "UpdateLinkError", 
            message: "There was an error updating the link!" });
    };
});

linksRouter.delete('/:linkId', async (req, res, next) => {
    const { linkId } = req.params;

    try {
        const link = await getLinkById(linkId);
        console.log("Link to Delete: ", link)

        if (link) {
            await deleteLink(linkId);
            console.log(`${ link.url } has been deleted!`);
            res.send(`${ link.url } has been deleted!`)
        };
    } catch ({ name, message }) {
        next({ 
            name: "DeleteLinkError", 
            message: "Error deleting the link from database!" });
    };
});

module.exports = linksRouter;