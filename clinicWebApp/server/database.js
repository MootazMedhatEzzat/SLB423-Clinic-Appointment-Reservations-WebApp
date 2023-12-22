// database.js

const { Pool } = require('pg');

const defaultDbPort = 5432;
const defaultDbHost = 'clinic-web-database-container';
const dbPort = process.env.DB_PORT || defaultDbPort;
const dbHost = process.env.DB_HOST || defaultDbHost;

const pool = new Pool({
    user: 'postgres',
    host: dbHost,
    database: 'clinic_database',
    password: 'clinic_database_pass',
    port: dbPort,
});

console.log(`Database server is running on port ${dbPort}`);
console.log(`Database host is running on port ${dbHost}`);

module.exports = pool;
