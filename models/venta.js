const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const ventaSchema = new Schema({
    nombre: String,
    email: String,
    telefono: String,
    direccion: String,
    ciudad: String,
    pais: String,
    codigo_postal: String,
    productos: [
        {
            id_producto: { type: Schema.Types.ObjectId, ref: 'Product' },
            cantidad: Number
        }
    ],
});

module.exports = mongoose.model('Venta', ventaSchema); // Exportar el modelo