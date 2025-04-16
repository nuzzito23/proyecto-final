const Product = require('../models/product');

// Registrar un nuevo usuario
exports.createProduct = async (req, res) => {
  try {
    const productObject = req.body; // Get product data from request body
    const newProduct = new Product(productObject); // Create a new product instance
    await newProduct.save(); // Save product to MongoDB
    res.status(201).json({ message: 'Create product successfully', data: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from MongoDB
    res.status(200).json({ message: 'Get products successfully', data: products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.getProduct = async (req, res) => {
  try {
    const products = await Product.findOne({_id: req.params.id}); // Fetch all products from MongoDB
    res.status(200).json({ message: 'Get products successfully', data: products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}