const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    role: String 
});

module.exports = mongoose.model('User', userSchema); // Exportar el modelo