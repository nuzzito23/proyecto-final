const express = require('express');
const multer = require('multer'); // Import multer for file uploads
const router = express.Router();
const ProductController = require('../controllers/products_controller'); // Import the ProductController
const {authenticateToken} = require('../shared/middleware/authenticateToken'); // Import the middlewar

const storage = multer.diskStorage({
  destination: "./static/imgs",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }); // Create a multer instance with the defined storage
// Route for product registration
router.post('/', authenticateToken, upload.single("image"), ProductController.createProduct); // Handle POST requests to create a new product
router.put('/:id',authenticateToken, ProductController.editProduct); // Handle PUT requests to edit an existing product
router.get('/list', ProductController.getProducts); // Handle GET requests to retrieve all products
router.get('/:id',authenticateToken, ProductController.getProduct);
router.delete('/:id',authenticateToken, ProductController.deleteProduct); // Handle GET requests to delete a product

module.exports = router; // Export the router