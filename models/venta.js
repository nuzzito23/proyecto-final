const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const ventaSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User'},
    nombre: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    postal_code: String,
    products: [
        {
            id_producto: { type: Schema.Types.ObjectId, ref: 'Product' },
            cantidad: Number
        }
    ],
});

module.exports = mongoose.model('Venta', ventaSchema); // Exportar el modelo