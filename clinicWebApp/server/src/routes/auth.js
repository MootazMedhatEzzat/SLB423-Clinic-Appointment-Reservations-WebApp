// server/src/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Patient routes
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

module.exports = router;