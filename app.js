require('dotenv').config();
const cors = require('cors');
const {connect} = require('./db/mongo');
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.routes');
const productRoute = require('./routes/product.routes');
const ventaRoute = require('./routes/ventas.routes');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded requests
// app.use(express.static('public')); // Serve static files from the public directory
app.use(cors({
    origin: '*', // Specify allowed frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api/users', userRoute); // Use the user routes
app.use('/api/products', productRoute); // Use the product routes
app.use('/api/ventas', ventaRoute); // Use the venta routes
// app.use('/', (req, res) => {
//     // res.status(200).json({ message: 'API is running' });
// }
// );
const PORT = process.env.PORT || 3000;
connect()
app.listen (PORT, () => {
    console.log(`⚡️[server]: http://localhost:${PORT}`);    
});



