const client = require('./client');
const { getLinkById } = require('./links');

async function createTags(tagList) {
    if (tagList.length === 0) {
        return;
    };

    const insertValues = tagList.map(
        (_, index) => `$${ index + 1 }`).join('), (');

    const selectValues = tagList.map(
        (_, index) => `$${ index + 1 }`).join(', ');

    try {
        await client.query(`
            INSERT INTO tags(name)
            VALUES (${ insertValues })
            ON CONFLICT (name) DO NOTHING;
        `, tagList);

        const { rows } = await client.query(`
            SELECT * FROM tags
            WHERE name
            IN (${ selectValues });
        `, tagList);

        return rows;
    } catch (error) {
        console.log("Error creating tags!");
        throw error;
    };
};

async function addTagsToLink(urlId, tagList) {
    try {
        const createLinkTagPromises = tagList.map(
            tag => createLinkTag(urlId, tag.id)
        );

        await Promise.all(createLinkTagPromises);

        return await getLinkById(urlId);
    } catch (error) {
        throw error;
    };
};

async function getTagById(tagId) {
    try {
        const { rows: tag } = await client.query(`
            SELECT *
            FROM tags
            WHERE id=$1;
        `, [ tagId ]);

        return tag; 
    } catch (error) {
        throw error;
    };
};

async function getTagByName(name) {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM tags
            WHERE name=$1
        `, [ name ]);

        return rows; 
    } catch (error) {
        throw error;
    };
};

async function getAllTags() {
    try {
        const { rows: tags } = await client.query(`
            SELECT *
            FROM tags;
        `);

        return tags;
    } catch (error) {
        throw error;
    };
};

module.exports = {
    createTags,
    addTagsToLink,
    getTagById,
    getTagByName,
    getAllTags,
};