require('dotenv').config();
require('./db/mongo');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Esta corrinedo 2')
console.log(`⚡️[server]: http://localhost:${PORT}`);

