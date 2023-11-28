// database.js

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'clinic-web-database-container',
    database: 'clinic_appointments_reservations',
    password: 'database_password', (In a development or local environment where security is not a major concern, we might be able to proceed without a password)
    port: 5432,
});

module.exports = pool;
