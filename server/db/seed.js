const client = require('./client');
const chalk = require('chalk');
const util = require('util');

const { 
    createLink,
    getAllLinks,
} = require('./index');

async function dropTables() {
    try {
        console.log(chalk.cyan("Starting to drop tables..."));

        await client.query(`
            DROP TABLE IF EXISTS link_tags;
            DROP TABLE IF EXISTS tags;
            DROP TABLE IF EXISTS links;
        `);

        console.log("Finished dropping tables.")
    } catch (error) {
        console.log("Error dropping tables!");
        throw error;
    };
};

async function createTables() {
    try {
        console.log(chalk.cyan("Starting to create tables..."));

        await client.query(`
            CREATE TABLE IF NOT EXISTS links (
            id SERIAL PRIMARY KEY,
            url VARCHAR(255) UNIQUE NOT NULL,
            comment TEXT NOT NULL,
            date DATE NOT NULL,
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

async function createInitialLinks() {
    try {
        console.log(chalk.cyan("Creating seeded links..."))
        const seededLinks = [
            {
                url: "https://www.google.com",
                comment: "This is where you need to go if you need any and everything.",
                date: "06-19-2020",
                tags: [ "search", "knowledge", "everything" ]

            },

            { 
                url: "https://www.youtube.com",
                comment: "All kinds of cool videos here.",
                date: "06-20-2020",
                tags: [ "videos", "fun", "diy" ]

            }
        ]

        console.log(chalk.cyan(util.inspect(seededLinks, { depth: null })));

        await Promise.all(seededLinks.map(link => {
            return createLink(link.url, link.comment, link.date, link.count);
        }));

        console.log(chalk.cyan("Finished creating links!"));
    } catch (error) {
        console.log(chalk.red("Error creating intial links!"));
        throw error;
    };
};

async function buildDB(force) {
    try {
        if (force) {
            await dropTables();
        }
        await createTables();
        await createInitialLinks();
    } catch (error) {
        console.log(chalk.red("Error during buildDB"));
        throw error;
    };
};

//** need to build out */
async function testDB() {
    try {
        console.log(chalk.yellow("Starting to test the database."));

        console.log(chalk.yellow("Calling getAllLinks..."));
        const allLinks = await getAllLinks();
        console.log(chalk.yellow("All Links: ", util.inspect(allLinks, { depth: null })));

    } catch (error) {
        console.log(chalk.red("Error testing the database..."));
        throw error;
    }
};

// rebuildDB()
//     .then(testDB)
//     .catch(console.error)
//     .finally(() => client.end()); 

module.exports = {
    buildDB,
    testDB,
};