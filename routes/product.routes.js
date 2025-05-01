const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products.controller'); // Import the ProductController

// Route for product registration
router.post('/', ProductController.createProduct); // Handle POST requests to create a new product
router.put('/', ProductController.editProduct); // Handle PUT requests to edit an existing product
router.get('/list', ProductController.getProducts); // Handle GET requests to retrieve all products
router.get('/:id', ProductController.getProduct);

module.exports = router; // Export the router