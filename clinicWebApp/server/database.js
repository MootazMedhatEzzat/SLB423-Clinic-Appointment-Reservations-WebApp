// database.js

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'clinic-web-database-container',
    database: 'clinic_database',
    password: 'clinic_database_pass',
    port: 5432,
});

module.exports = pool;
