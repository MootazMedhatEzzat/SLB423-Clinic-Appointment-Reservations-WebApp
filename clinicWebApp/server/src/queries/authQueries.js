// server/src/queries/authqueries.js

// Sign Up Queries
const signUpCheckUserQuery = `
  SELECT id FROM users WHERE name = $1 OR username = $2 OR email = $3
`;

const signUpInsertUserQuery = `
  INSERT INTO users (name, username, email, password, role)
  VALUES ($1, $2, $3, $4, $5) RETURNING *
`;

const signUpInsertDoctorQuery = `
  INSERT INTO doctors (doctor_id) SELECT id FROM users WHERE name = $1
`;

// Sign In Queries
const signInQuery = `
  SELECT * FROM users WHERE username = $1
`;

// Export the queries
module.exports = {
  signUpCheckUserQuery,
  signUpInsertUserQuery,
  signUpInsertDoctorQuery,
  signInQuery,
};