const express = require('express');
const router = express.Router();
const paypalController = require('../controllers/paypal_controller'); // Import the PayPal controller
const {authenticateToken} = require('../shared/middleware/authenticateToken'); // Import the middlewar
// 
router.post('/', authenticateToken, paypalController.paypalCreateOrder); // Handle POST requests to create a new venta
router.post('/:orderID/capture', authenticateToken, paypalController.paypalCaptureOrder); // Handle GET requests to retrieve all ventas

module.exports = router;