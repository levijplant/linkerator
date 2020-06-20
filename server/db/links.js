const client = require('./client');
const { createTags, addTagsToLink } = require('./tags');

async function createLink(url, comment, date, tags = []) {
    try {
        let { rows: [ link ] } = await client.query(`
                INSERT INTO links (url, comment, date)
                VALUES ($1, $2, $3)
                ON CONFLICT (url) DO NOTHING
                RETURNING *;
            `, [ url, comment, date ]);

            if (link === undefined) {
                throw new Error("Link already exists. Try update instead.");
            }

            console.log("LINK: ", link);
            
            return link;
        } catch (error) {
        throw error;
    };
};

async function updateLink(urlId, fields = {}) {
    const { tags } = fields;
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

        await addTagsToLink(urlId, tagList);

        return await getLinkById(urlId);
    } catch (error) {
    throw error;
    };
};

async function deleteLink(id) {
    try {
        await client.query(`
            DELETE FROM links
            WHERE id=$1;
        `, [ id ]);

        await client.query(`
            DELETE FROM link_tags
            WHERE "urlId"=$1;
        `, [ id]);
    } catch (error) {
        console.error("Error deleting link!");
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
        
        // const { rows: [ author ] } = await client.query(`
        //     SELECT id, username, name, location, active
        //     FROM users
        //     WHERE id=$1;
        // `, [ link.authorId ]);

        link.tags = tags;
        // link.author = author;

        // delete link.authorId;

        return link; 
    } catch (error) {
        throw error;
    };
};

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

        // const links = await Promise.all(linkIds.map(
        //     link => getLinkById( link.id )
        // ));

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