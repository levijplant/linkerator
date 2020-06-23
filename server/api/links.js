const { createLink, updateLink, getAllLinks, getLinkById, deleteLink } = require('../db/links');
const { createTags, getTagsByLinkId } = require('../db/tags');
const { createLinkTag } = require('../db/link_tags');

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

// linksRouter.get('/:linkName', async (req, res, next) => {
//     try {
//         const linkName = req.params;
//         const link = await getLinkByName(linkName);

//         for (let link of links) {
//             link.tags = await getTagsByLinkId(link.id);
//         };

//         console.log("Link: ", link);
//         res.send({ link });
//     } catch (error) {
//         throw error;
//     }
// });

linksRouter.post('/', async (req, res, next) => {
    try {
        const { name, url, comment, date, count, tags = [] } = req.body;
        
        const link = await createLink(name, url, comment, date, count);
        const tagList = await createTags(tags);
        
        await Promise.all(tagList.map(tag => {
            const link_tag = createLinkTag(link.id, tag.id);
            return link_tag;
        }));

        console.log(">>>TAGLIST<<<", tagList);
        link.tags = tagList;

        if (link) {
            res.send(`New link "${ link.url }" has been created!`);
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

    if (comment) {
        updateFields.comment = comment;
    };

    if (count) {
        updateFields.count = count;
    };
    
    if (tags) {
        updateFields.tags = tags;
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

linksRouter.delete('/:linkId', async (req, res, send) => {
    const { linkId } = req.params;

    try {
        const link = await getLinkById(linkId);
        console.log(link)

        if (link) {
            await deleteLink(linkId);
            console.log(`${ link.url } has been deleted!`);
            res.send(`${ link.url } has been deleted!`)
        };
    } catch ({ name, message }) {
        next({ name, message });
    };

});

module.exports = linksRouter;