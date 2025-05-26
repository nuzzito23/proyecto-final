require('dotenv').config();
const cors = require('cors');
const { connect } = require('./db/mongo');
const express = require('express');
const userRoute = require('./routes/user.routes');
const productRoute = require('./routes/product.routes');
const ventaRoute = require('./routes/ventas.routes');
const paypalRoute = require('./routes/paypal.routes');


// Initialize Express App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve Static Files
app.use(express.static(__dirname + '/static'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/html/home.html');
});


// Routes for Existing API
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/ventas', ventaRoute);
app.use('/api/orders', paypalRoute);

// Start Server
const PORT = process.env.PORT || 3000;
connect();
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server running at http://localhost:${PORT})`);
});