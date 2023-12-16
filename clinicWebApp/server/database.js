// database.js

const { Pool } = require('pg');

const defaultDbPort = 5432;
const dbPort = process.env.DB_PORT || defaultDbPort;

const pool = new Pool({
    user: 'postgres',
    host: 'clinic-web-database-container',
    database: 'clinic_database',
    password: 'clinic_database_pass',
    port: dbPort,
});

console.log(`Database server is running on port ${dbPort}`);

module.exports = pool;
