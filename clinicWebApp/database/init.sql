-- init.sql

CREATE TYPE user_role AS ENUM ('doctor', 'patient');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL CHECK (username !~ '\s'),
  email VARCHAR(100) UNIQUE NOT NULL CHECK (email !~ '\s'),
  password VARCHAR(100) NOT NULL CHECK (password !~ '\s'),
  role user_role NOT NULL
);

CREATE TABLE doctors (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  specialty VARCHAR(100)
);

CREATE TABLE slots (
  id SERIAL PRIMARY KEY,
  doctor_id INTEGER REFERENCES doctors(doctor_id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  reservations_num INTEGER NOT NULL
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  slot_id INTEGER REFERENCES slots(id) ON DELETE CASCADE
);
