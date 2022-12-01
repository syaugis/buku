const env = require('dotenv');
const { default: mongoose } = require('mongoose');
env.config();

const MONGODB = process.env.MONGODB;

const db = mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = db;