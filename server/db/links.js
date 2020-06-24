const client = require('./client');
const { createTags, addTagsToLink, getTagsByLinkId } = require('./tags');
const { createLinkTag } = require('./link_tags');

async function createLink( name, url, comment) {
    try {
        let { rows: [ link ] } = await client.query(`
                INSERT INTO links (name, url, comment)
                VALUES ($1, $2, $3)
                ON CONFLICT (url) DO NOTHING
                RETURNING *;
            `, [ name, url, comment ]);

        if (link === undefined) {
            throw new Error("Link already exists. Try update instead.");
        };

        return link;
    } catch (error) {
        throw error;
    };
};

async function updateLink(urlId, fields = { }) {
    const { tags } = fields;
    console.log(fields);
    delete fields.tags;

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    try {
        if (setString.length > 0) {
            await client.query(`
                UPDATE links
                SET ${ setString }
                WHERE id=${ urlId }
                RETURNING *;
                `, Object.values(fields));
        };

        if (tags === undefined) {
            return await getLinkById(urlId);
        };

        const tagList = await createTags(tags);
        const tagListIdString = tagList.map(
            tag => `${ tag.id }`
        ).join(', ');

        await client.query(`
            DELETE FROM link_tags
            WHERE "tagId"
            NOT IN (${ tagListIdString })
            AND "urlId"=$1;
        `, [ urlId ]);

        console.log("After DELETE FROM link-tags")

        await addTagsToLink(urlId, tagList);

        return await getLinkById(urlId);
    } catch (error) {
        console.log(error)
        throw error;
    };
};

async function deleteLink(id) {
    console.log(">>>>ID<<<<", id);
    try {

        await client.query(`
            DELETE FROM link_tags
            WHERE "urlId"=$1;
        `, [ id ]);

        await client.query(`
            DELETE FROM links
            WHERE id=$1;
        `, [ id ]);

    } catch (error) {
        console.error("Error deleting link!");
        console.log(error)
        throw error
    };
};

async function getLinkById(urlId) {
    try {
        const { rows: [ link ] } = await client.query(`
            SELECT *
            FROM links
            WHERE id=$1;
        `, [ urlId ]);

        if (!link) {
            throw {
                name: "LinkNotFoundError",
                message: "Could not find a link with that urlId"
            };
        };

        const { rows: tags } = await client.query(`
            SELECT tags.*
            FROM tags
            JOIN link_tags ON tags.id=link_tags."tagId"
            WHERE link_tags."urlId"=$1;
        `, [ urlId ]);
        
        link.tags = tags;

        return link; 
    } catch (error) {
        throw error;
    };
};

// async function getLinkByName(linkName) {
//     try {
//         console.log(linkName);

//         const { rows: [ link ] } = await client.query(`
//             SELECT *
//             FROM links
//             WHERE name=$1;
//         `, [ linkName ]);

//         if (!link) {
//             throw {
//                 name: "LinkNotFoundError",
//                 message: "Could not find a link with that name!"
//             };
//         };
        
//         return link; 
//     } catch (error) {
//         console.error(error)
//         throw error;
//     };
// };

async function getLinksByTagName(tagName) {
    try {
        const { rows: urlIds } = await client.query(`
            SELECT links.id
            FROM links
            JOIN link_tags ON links.id=link_tags."urlId"
            JOIN tags ON tags.id=link_tags."tagId"
            WHERE tags.name=$1;
        `, [ tagName ]);

        return await Promise.all(urlIds.map(
            link => getLinkById(link.id)
        ));
    } catch (error) {
        throw error;
    };
};

async function getAllLinks() {
    try {
        const { rows: links } = await client.query(`
            SELECT *
            FROM links;
        `);

        for (let link of links) {
            link.tags = await getTagsByLinkId(link.id);
        };

        return links;
    } catch (error) {
        throw error;
    };
};

module.exports = {
    createLink,
    updateLink,
    deleteLink,
    getLinkById,
    getLinksByTagName,
    getAllLinks,
};