const client = require('./client');
const chalk = require('chalk');
const util = require('util');

const { 
    createLink,
    getAllLinks,
    createTags,
    getAllTags,
    createLinkTag,
} = require('./index');

async function dropTables() {
    try {
        console.log(chalk.cyan("Starting to drop tables..."));

        await client.query(`
            DROP TABLE IF EXISTS link_tags;
            DROP TABLE IF EXISTS tags;
            DROP TABLE IF EXISTS links;
        `);

        console.log(chalk.cyan("Finished dropping tables."));
    } catch (error) {
        console.log(chalk.red("Error dropping tables!"));
        throw error;
    };
};

async function createTables() {
    try {
        console.log(chalk.cyan("Starting to create tables..."));

        await client.query(`
            CREATE TABLE IF NOT EXISTS links (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            url VARCHAR(255) UNIQUE NOT NULL,
            comment TEXT NOT NULL,
            date DATE NOT NULL DEFAULT CURRENT_DATE,
            count INTEGER NOT NULL DEFAULT 0
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS tags (
            id SERIAL PRIMARY KEY,
            name TEXT UNIQUE NOT NULL
            );
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS link_tags (
            "urlId" INTEGER REFERENCES links(id),
            "tagId" INTEGER REFERENCES tags(id),
            PRIMARY KEY ("urlId", "tagId")
            );
        `);

        console.log(chalk.cyan("Finished creating tables."));
    } catch (error) {
        console.log("Error creating tables!");
        throw error;
    };
};

async function createInitialTags() {
    console.log(chalk.cyan("Creating initial tags..."));

    const seededTags = [
        "search",
        "knowledge",
        "everything",
        "videos",
        "fun",
        "diy"
    ]

    console.log(chalk.cyan("Seeded Tags: ", seededTags));

    await Promise.all(seededTags.map(tag => {
        return createTags(seededTags);
    }));
};

async function createInitialLinks() {
    try {
        console.log(chalk.cyan("Creating seeded links..."))
        const seededLinks = [
            {
                name: "Google",
                url: "https://www.google.com",
                comment: "This is where you need to go if you need any and everything.",
                tags: [ "search", "knowledge", "everything" ]

            },

            { 
                name: "YouTube",
                url: "https://www.youtube.com",
                comment: "All kinds of cool videos here.",
                tags: [ "videos", "fun", "diy" ]

            }
        ]

        console.log(chalk.cyan("Seeded Links: ", util.inspect(seededLinks, { depth: null })));

        await Promise.all(seededLinks.map(async link => {
            const seededLink = await createLink(link.name, link.url, link.comment, link.date, link.count);
            seededLink.tags = await createTags(link.tags)
            return seededLink;
        }));

        console.log(chalk.cyan("Finished creating links!"));
    } catch (error) {
        console.log(chalk.red("Error creating intial links!"));
        throw error;
    };
};

async function addInitialTagsToLinks() {
    try {
        console.log("Starting to seed link_tags...");

        const seededLinkTags = [
            {
                urlId: 1,
                tagId: 1
            },
            {
                urlId: 1,
                tagId: 2
            },
            {
                urlId: 1,
                tagId: 3
            },
            {
                urlId: 2,
                tagId: 4
            },
            {
                urlId: 2,
                tagId: 5
            },
            {
                urlId: 2,
                tagId: 6
            }
        ];

        await Promise.all(seededLinkTags.map(async linkTag => {
            const seededLinkTag = await createLinkTag(linkTag.urlId, linkTag.tagId);
            return seededLinkTag;
        }));

        console.log("Finished creating link_tags...");
    } catch (error) {
        throw error;
    };
};

async function buildDB(force) {
    try {
        if (force) {
            await dropTables();
        }
        await createTables();
        await createInitialTags();
        await createInitialLinks();
        await addInitialTagsToLinks();
    } catch (error) {
        console.log(chalk.red("Error during buildDB"));
        throw error;
    };
};

async function testDB() {
    try {
        console.log(chalk.yellow("Starting to test the database."));

        console.log(chalk.yellow("Calling getAllTags..."));
        const allTags = await getAllTags();
        console.log(chalk.yellow("All Tags: ", util.inspect(allTags, { depth: null })));

        console.log(chalk.yellow("Calling getAllLinks..."));
        const allLinks = await getAllLinks();
        console.log(chalk.yellow("All Links: ", util.inspect(allLinks, { depth: null })));

        // console.log(chalk.yellow("Adding tags to link ids 1 and 2."));
        // const tagsLinkOne = await addTagsToLink(1, [ 1, 2, 3 ]);
        // const tagsLinkTwo = await addTagsToLink(2, [ 4, 5, 6 ]);
        // console.log(chalk.yellow("Updated Links with Tags: ", tagsLinkOne, tagsLinkTwo));

        console.log(chalk.yellow("Done testing the database!"));
    } catch (error) {
        console.log(chalk.red("Error testing the database..."));
        throw error;
    }
};

module.exports = {
    buildDB,
    testDB,
};