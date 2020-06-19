const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'https://localhost:5432/thegreatlinkerator';
const client = new Client(connectionString);

module.exports = client;