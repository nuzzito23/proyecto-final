const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users.controller'); // Import the UserController

// Route for user registration
router.post('/register', UserController.register);
router.post('/login', UserController.login); // Route for user login

module.exports = router; // Export the router