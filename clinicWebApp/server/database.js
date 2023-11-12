// database.js

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database_name',
    password: 'database_password',
    port: 5432,
});

module.exports = pool;
