const express = require('express');
const { Client } = require('pg');
const chalk = require('chalk');
const path = require('path');

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/thegreatlinkerator';

const app = express();

const db = new Client(DATABASE_URL);

db.connect();

const seed = async (force = false) => {
    if (force) {
        await db.query(`
        DROP TABLE IF EXISTS link_tags;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS links;
        `);
    }

    await db.query(`
        CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        link VARCHAR(255) UNIQUE NOT NULL,
        count INTEGER NOT NULL DEFAULT 0,
        comment TEXT NOT NULL,
        date DATE NOT NULL
        );
    `);

    await db.query(`
        CREATE TABLE IF NOT EXISTS tags (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL
        );
    `);

    await db.query(`
        CREATE TABLE IF NOT EXISTS link_tags (
        "linkId" INTEGER REFERENCES links(id),
        "tagId" INTEGER REFERENCES tags(id),
        PRIMARY KEY ("linkId", "tagId")
        );
    `);

    console.log(chalk.red(`DB successfully seeded! Force: ${force}`))
}

const startServer = () => new Promise((res) => {
    app.listen(PORT, () => {
        console.log(chalk.green(`Server is listening on PORT:${PORT}`));
        res();
    });
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/links', async (req, res) => {
    const { rows } =  await db.query(`
        SELECT * 
        FROM links;
    `);

    res.send({ links: rows });
});

seed()
    .then(startServer)
    .catch((error) => {
        console.error('Failed to seed or start server.');
        db.end();
        throw error;
});