const User = require('../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const userObject = req.body; // Get user data from request body
    const newUser = new User(userObject); // Create a new user instance
    const salt = await bcrypt.genSalt(10); // Toma la contrasena y percuta con ella y hace el proceso la cantidad de veces marcadas
    newUser.password = await bcrypt.hash(newUser.password, salt); // Hashea la contrasena
    await newUser.save(); // Save user to MongoDB
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // Get user credentials from request body
    const user = (await User.findOne({ email }))._doc; // Find user by email
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isValidPassword = await comparePassword(password, user.password); // Compare password with stored hash
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id, name:user.name, email:user.email }, process.env.JWT_SECRET, { expiresIn: '24h' }); // Creando un token con expracion de 24 horas
    res.status(200).json({ token }); // Send token to client
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Esto compara la contrasena del login con la del password
async function comparePassword(password, userPassword) {
  return await bcrypt.compare(password, userPassword);
}