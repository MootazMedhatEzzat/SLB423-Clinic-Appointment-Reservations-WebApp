// server/src/controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../database');

const { signUpCheckUserQuery, signUpInsertUserQuery, signUpInsertDoctorQuery, signInQuery } = require('../queries/authQueries');

exports.signUp = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start the transaction

    const { name, username, email, password, role } = req.body;

    // Check if the user (name, username or email) is already registered
    const existingUser = await client.query(signUpCheckUserQuery, [name, username, email]);
    if (existingUser.rows.length > 0) {
      await client.query('ROLLBACK'); // Rollback the transaction
      return res.status(400).json({ message: "There's Already An Account With This Name, Username or Email" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = await client.query(signUpInsertUserQuery, [name, username, email, hashedPassword, role]);

    // If the new user is a doctor, insert him/here into the doctors table
    if (role === 'doctor') {
      await client.query(signUpInsertDoctorQuery, [name]);
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser.rows[0].id }, 'your-secret-key');

    await client.query('COMMIT'); // Commit the transaction

    //res.json({ token });
    res.json({ userId: newUser.rows[0].id, token });
  } catch (error) {
    console.error('Error signing up:', error);
    await client.query('ROLLBACK'); // Rollback the transaction in case of an error
    res.status(500).json({ message: 'An error occurred while signing up.' });
  } finally {
    client.release(); // Release the database connection
  }
};

exports.signIn = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start the transaction

    const { username, password } = req.body;

    // Check if the username is registered
    const existingUser = await client.query(signInQuery, [username]);
    if (existingUser.rows.length === 0) {
      await client.query('ROLLBACK'); // Rollback the transaction
      return res.status(400).json({ message: 'Username Not Registered' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, existingUser.rows[0].password);
    if (!isPasswordValid) {
      await client.query('ROLLBACK'); // Rollback the transaction
      return res.status(401).json({ message: 'Invalid Password' });
    }

    // Generate a JWT token
    //const token = jwt.sign({ userId: existingUser.rows[0].id }, 'your-secret-key');
    const token = jwt.sign({ userId: existingUser.rows[0].id, role: existingUser.rows[0].role }, 'your-secret-key');

    await client.query('COMMIT'); // Commit the transaction

    //res.json({ token });
    res.json({ userId: existingUser.rows[0].id, role: existingUser.rows[0].role, token });
  } catch (error) {
    console.error('Error signing in:', error);
    await client.query('ROLLBACK'); // Rollback the transaction in case of an error
    res.status(500).json({ message: 'An error occurred while signing in.' });
  } finally {
    client.release(); // Release the database connection
  }
};