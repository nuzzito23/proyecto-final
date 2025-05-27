const ventaController = require("./ventas_controller");

// Importar PayPal SDK 
const {
    ApiError,
    Client,
    Environment,
    LogLevel,
    OrdersController,
    PaymentsController,
} = require("@paypal/paypal-server-sdk");

// Autenticar cliente con PayPal
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

//esto para poder realizar el pago en paypal
exports.paypalCreateOrder = async (req, res) => {
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
                        items: cart.map((item) => ({
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

        const { body, ...httpResponse } = await ordersController.createOrder(
            collect,
        );
        //esto para crear la venta en la base de datos
        const venta = await ventaController.createVenta({ 
            body: {
                user_id: req.user.id,
                postal_code: req.body.postal_code,
                products: cart.map((item) => ({
                    id_producto: item.id,
                    cantidad: item.quantity,
                    price: item.price,
                    name: item.name,
                })),
                price: total_price,
            },
        });
        res.status(httpResponse.statusCode).json(JSON.parse(body));
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
};

//esto forma parte del SDK de PayPal y se usa para capturar el pago
exports.paypalCaptureOrder = async (req, res) => {
    try {
        const { orderID } = req.params;
        const { body, ...httpResponse } = await ordersController.captureOrder({
            id: orderID,
            prefer: "return=minimal",
        });
        res.status(httpResponse.statusCode).json(JSON.parse(body));
    } catch (error) {
        console.error("Failed to capture order:", error);
        res.status(500).json({ error: "Failed to capture order." });
    }
};