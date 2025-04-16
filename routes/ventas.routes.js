const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventas.controller'); // Import the VentaController

router.post('/', ventaController.createVenta); // Handle POST requests to create a new venta
router.get('/list', ventaController.getVentas); // Handle GET requests to retrieve all ventas
router.get('/:id', ventaController.getVenta); // Handle GET requests to retrieve a specific venta by ID