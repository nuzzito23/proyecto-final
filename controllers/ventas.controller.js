const venta = require('../models/venta');

exports.createVenta = async (req, res) => {
  try {
    const ventaObject = req.body; // Get venta data from request body
    const newVenta = new venta(ventaObject); // Create a new venta instance
    await newVenta.save(); // Save venta to MongoDB
    res.status(201).json({ message: 'Create venta successfully', data: newVenta });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.getVentas = async (req, res) => {
  try {
    const ventas = await venta.find(); // Fetch all ventas from MongoDB
    res.status(200).json({ message: 'Get ventas successfully', data: ventas });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.getVenta = async (req, res) => {
  try {
    const venta = await venta.findOne({_id: req.params.id}); // Fetch all ventas from MongoDB
    res.status(200).json({ message: 'Get ventas successfully', data: venta });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}