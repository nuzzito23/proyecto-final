const Product = require('../models/product');

// Registrar un nuevo usuario
exports.createProduct = async (req, res) => {
  try {
    const productObject = req.body; // Obtener datos del producto desde el cuerpo de la solicitud
    const newProduct = new Product(productObject); // Crear una nueva instancia de producto
    newProduct.image = `/imgs/${req.file.filename}`
    await newProduct.save(); // Guardar producto en MongoDB
    res.status(201).json({ message: 'Create product successfully', data: newProduct });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Editar un producto existente
exports.editProduct = async (req, res) => {
  try {
    const _id = req.params.id
    const productObject = req.body; // Get product data from request body
    const product = await Product.findByIdAndUpdate(_id, productObject, { new: true }); // Update product in MongoDB
    res.status(201).json({ message: 'Edit product successfully', data: product });
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

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id); // Delete product from MongoDB
    res.status(200).json({ message: 'Delete product successfully', data: product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}