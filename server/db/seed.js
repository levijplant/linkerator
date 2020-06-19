const client = require('./client');

async function dropTables() {
    try {
        console.log("Starting to drop tables...");

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
        console.log("Starting to create tables...");

        await client.query(`
            CREATE TABLE IF NOT EXISTS links (
            id SERIAL PRIMARY KEY,
            link VARCHAR(255) UNIQUE NOT NULL,
            count INTEGER NOT NULL DEFAULT 0,
            comment TEXT NOT NULL,
            date DATE NOT NULL
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
            "linkId" INTEGER REFERENCES links(id),
            "tagId" INTEGER REFERENCES tags(id),
            PRIMARY KEY ("linkId", "tagId")
            );
        `);

        console.log("Finished creating tables.");
    } catch (error) {
        console.log("Error creating tables!");
        throw error;
    };
};

async function buildDB(force) {
    try {
        if (force) {
            await dropTables();
        }
        await createTables();
    } catch (error) {
        console.log("Error during rebuildDB");
        throw error;
    };
};

//** need to build out */
async function testDB() {

};

// rebuildDB()
//     .then(testDB)
//     .catch(console.error)
//     .finally(() => client.end()); 

module.exports = {
    buildDB
}