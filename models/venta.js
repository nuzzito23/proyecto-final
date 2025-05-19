const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const ventaSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    name: String,
    email: String,
    phone: String,
    price: Number,
    address: String,
    city: String,
    country: String,
    postal_code: String,
    products: [
        {
            id_producto: { type: Schema.Types.ObjectId, ref: 'Product' },
            cantidad: Number,
            price: Number,
            name: String,
        }
    ],
});

module.exports = mongoose.model('Venta', ventaSchema); // Exportar el modelo