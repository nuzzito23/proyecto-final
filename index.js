require('dotenv').config();
const cors = require('cors');
const { connect } = require('./db/mongo');
const express = require('express');
const userRoute = require('./routes/user.routes');
const productRoute = require('./routes/product.routes');
const ventaRoute = require('./routes/ventas.routes');
const paypalRoute = require('./routes/paypal.routes');


// Premite hacer peticiones desde la app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Archivos estáticos del servidor
app.use(express.static(__dirname + '/static'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/html/home.html');
});


// Rutas para API existentes
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/ventas', ventaRoute);
app.use('/api/orders', paypalRoute);

// Iniciar servidor y conectar a la base de datos
const PORT = process.env.PORT || 3000;
connect();
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server running at http://localhost:${PORT})`);
});