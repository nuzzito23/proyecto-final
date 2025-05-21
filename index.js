require('dotenv').config();
const cors = require('cors');
const { connect } = require('./db/mongo');
const express = require('express');
const userRoute = require('./routes/user.routes');
const productRoute = require('./routes/product.routes');
const ventaRoute = require('./routes/ventas.routes');

// Import PayPal SDK
const {
    ApiError,
    Client,
    Environment,
    LogLevel,
    OrdersController,
    PaymentsController,
} = require("@paypal/paypal-server-sdk");

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

// Initialize PayPal Client
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const client = new Client({
    clientCredentialsAuthCredentials: {
        oAuthClientId: PAYPAL_CLIENT_ID,
        oAuthClientSecret: PAYPAL_CLIENT_SECRET,
    },
    timeout: 0,
    environment: Environment.Sandbox,
    logging: {
        logLevel: LogLevel.Info,
        logRequest: { logBody: true },
        logResponse: { logHeaders: true },
    },
});

const ordersController = new OrdersController(client);
const paymentsController = new PaymentsController(client);

// Routes for Existing API
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/ventas', ventaRoute);

// PayPal Order Creation Route
app.post("/api/orders", async (req, res) => {
    try {
        const { cart, total_price } = req.body;
        const collect = {
            body: {
                intent: "CAPTURE",
                purchaseUnits: [
                    {
                        amount: {
                            currencyCode: "USD",
                            value: String(total_price),
                            breakdown: {
                                itemTotal: {
                                    currencyCode: "USD",
                                    value: String(total_price),
                                },
                            },
                        },
                        items: cart.map(item => ({
                            name: item.name,
                            unitAmount: {
                                currencyCode: "USD",
                                value: item.price.toString(),
                            },
                            quantity: "1",
                            description: "Product purchase",
                            sku: item.id,
                        })),
                    },
                ],
            },
            prefer: "return=minimal",
        };

        const { body, ...httpResponse } = await ordersController.createOrder(collect);
        res.status(httpResponse.statusCode).json(JSON.parse(body));
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
});

// PayPal Payment Capture Route
app.post("/api/orders/:orderID/capture", async (req, res) => {
    try {
        const { orderID } = req.params;
        const { body, ...httpResponse } = await ordersController.captureOrder({ id: orderID, prefer: "return=minimal" });
        res.status(httpResponse.statusCode).json(JSON.parse(body));
    } catch (error) {
        console.error("Failed to capture order:", error);
        res.status(500).json({ error: "Failed to capture order." });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
connect();
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server running at http://localhost:${PORT})`);
});

