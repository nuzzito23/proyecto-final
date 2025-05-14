const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users_controller'); // Import the UserController

// Route for user registration
router.post('/register', UserController.register);
router.post('/login', UserController.login); // Route for user login
router.post('/admin/login', UserController.adminLogin); // Route for admin login

module.exports = router; // Export the router