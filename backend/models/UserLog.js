const mongoose = require('mongoose');

const userLogSchema = new mongoose.Schema({
    ip: String,
    user: String,
    browser: String,
    os: String,
    device: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserLog', userLogSchema);