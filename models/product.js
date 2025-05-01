const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    color: String,
    stock: Number,  
});

module.exports = mongoose.model('Product', productSchema); // Exportar el modelo