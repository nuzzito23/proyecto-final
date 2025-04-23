const Venta = require('../models/venta');
const User = require('../models/user');

exports.createVenta = async (req, res) => {
  try {
    const {user_id, postal_code, products, total} = req.body; // Get venta data from request body
    const user = (await User.findOne({_id: user_id}))._doc; // Fetch user from MongoDB
    if (!user) return res.status(404).json({ message: 'User not found' }); // Check if user exists

    const newVenta = new Venta({
      user_id: user._id, // Set user ID
      email: user?.email ?? '', // Set user email
      name: user?.name ?? '', // Set user name
      phone: user?.phone ?? '', // Set user phone
      address: user?.address ?? '', // Set user address
      city: user?.city ?? '', // Set user city
      country: user?.country ?? '', // Set user country
      postal_code: postal_code, // Set postal code
      products: products, // Set products
      total_price: total, // Calculate total price
      created_at: new Date(), // Set creation date
    }); // Create a new venta instance
    await newVenta.save(); // Save venta to MongoDB
    res.status(201).json({ message: 'Create venta successfully', data: newVenta });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
}

exports.getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find(); // Fetch all ventas from MongoDB
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