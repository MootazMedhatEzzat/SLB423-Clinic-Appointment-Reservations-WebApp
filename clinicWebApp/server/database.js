// database.js

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'clinic-web-database-container',
    database: 'clinic_appointments_reservations',
    password: 'database_password',
    port: 5432,
});

module.exports = pool;
