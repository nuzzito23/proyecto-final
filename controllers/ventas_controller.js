const Venta = require('../models/venta');
const Product = require('../models/product');
const User = require('../models/user');
const mongoose = require('mongoose'); // Import mongoose for MongoDB operations

//Crear venta
exports.createVenta = async (req, res) => {
  try {
    const {user_id, postal_code, products, price} = req.body; // Get venta data from request body
    const user = (await User.findOne({_id: user_id}))._doc; // Fetch user from MongoDB
    if (!user) return res.status(404).json({ message: 'User not found' }); // Check if user exists

    const newVentaObject = {
      user_id: user._id, // Set user ID
      email: user?.email ?? '', // Set user email
      name: user?.name ?? '', // Set user name
      phone: user?.phone ?? '', // Set user phone
      address: user?.address ?? '', // Set user address
      city: user?.city ?? '', // Set user city
      country: user?.country ?? '', // Set user country
      postal_code: postal_code, // Set postal code
      products: products.map(item => {
        return {
          id_producto: new mongoose.Types.ObjectId(item.id_producto), // Set product ID
          cantidad: 1, // Set product quantity
          price: Number(item.price), // Set product price
          name: item.name, // Set product name
        }
      }), // Set products
      price: price, // Calculate total price
      created_at: new Date(), // Set creation date
    }; // Create a new venta instance
    const newVenta = new Venta(newVentaObject); // Create a new Venta document
    await newVenta.save(); // Save venta to MongoDB
  } catch (error) {
    console.log(error)
  }
}

//Obtener lista de ventas
exports.getVentas = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).lean(); // Fetch user from MongoDB
    const result=[]
    const ventas = await Venta.find({
      ...req.user.role === 'user' ? { user_id: user._id } : {},
    }).lean(); // Fetch all ventas from MongoDB
    for (const venta of ventas) {
      const productIds = venta.products.map(product => {
        return product.id_producto.toString();
      });
      const products = await Product.find({ _id: { $in: productIds } }).lean() ?? [];
      const productsWithDetails = venta.products.map(product => {
        const productDetails = products.find(p => p._id.toString() === product.id_producto.toString());
        return {
          ...product,
          name: productDetails ? productDetails.name : 'Unknown',
          price: productDetails ? productDetails.price : 0,
        };
      });
      result.push({
        _id: venta._id,
        user_id: venta.user_id,
        email: venta.email,
        name: venta.name,
        phone: venta.phone,
        address: venta.address,
        city: venta.city,
        country: venta.country,
        price: venta.price,
        products: productsWithDetails.map(product =>
          `${product.name} Cantidad: ${product.cantidad} Precio: ${product.price}$`),
      });
    }
    res.status(200).json({ message: 'Get ventas successfully', data: result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtener una venta por ID
exports.getVenta = async (req, res) => {
  try {
    const venta = await venta.findOne({_id: req.params.id}); // Fetch all ventas from MongoDB
    res.status(200).json({ message: 'Get ventas successfully', data: venta });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}