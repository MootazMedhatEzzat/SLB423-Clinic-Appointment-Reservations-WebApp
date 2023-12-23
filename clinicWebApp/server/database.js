// database.js

const { Pool } = require('pg');

const defaultDbUser = 'postgres';
const defaultDbHost = 'clinic-web-database-container';
const defaultDbName = 'clinic_database';
const defaultDbPassword = 'clinic_database_pass';
const defaultDbPort = 5432;

const dbUser = process.env.DB_USER || defaultDbUser;
const dbHost = process.env.DB_HOST || defaultDbHost;
const dbName = process.env.DB_NAME || defaultDbName;
const dbPassword = process.env.DB_PASSWORD || defaultDbPassword;
const dbPort = process.env.DB_PORT || defaultDbPort;

const pool = new Pool({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPassword,
    port: dbPort,
});

console.log(`Database server is running on port ${dbPort}`);
console.log(`Database is running on host ${dbHost}`);
console.log(`Database name ${dbName}`);
console.log(`Database user ${dbUser}`);
console.log(`Database password ${dbPassword}`);

module.exports = pool;
