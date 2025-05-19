const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventas_controller'); // Import the VentaController
const {authenticateToken} = require('../shared/middleware/authenticateToken'); // Import the middlewar
// 
router.post('/', authenticateToken, ventaController.createVenta); // Handle POST requests to create a new venta
router.get('/list', authenticateToken, ventaController.getVentas); // Handle GET requests to retrieve all ventas
router.get('/:id', authenticateToken, ventaController.getVenta); // Handle GET requests to retrieve a specific venta by ID

module.exports = router;