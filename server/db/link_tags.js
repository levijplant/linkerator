const client = require('./client');

async function createLinkTag(urlId, tagId) {
    try {
        await client.query(`
            INSERT INTO link_tags("urlId", "tagId")
            VALUES ($1, $2)
            RETURNING *;
        `, [ urlId, tagId ]);
    } catch (error) {
        throw error;
    };
};

async function deleteLinkTag(id) {
    try {
        await client.query(`
            DELETE FROM link_tags
            WHERE id=$1;
        `, [ id ]);
    } catch (error) {
        throw error;
    };
};

async function getLinkTagById(linkTagId) {
    try {
        const { rows: [ link_tag ] } = await client.query(`
            SELECT *
            FROM link_tags
            WHERE id=$1;
        `, [ linkTagId ]);

        return link_tag;
    } catch (error) {
        throw error;
    };
};

module.exports = {
    createLinkTag,
    deleteLinkTag,
    getLinkTagById,
};