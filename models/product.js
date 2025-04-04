const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const productSchema = new Schema({
    _id : Schema.Types.ObjectId,
    name: String,
    description: String,
    image: String,
    price: Number,
    models: [
        {
            color: String,
            stock: Number
        }
    ],
    
});

module.exports = mongoose.model('Product', productSchema); // Exportar el modelo