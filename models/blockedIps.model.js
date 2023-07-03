// Import the required dependencies
const mongoose = require('mongoose');


const blockedIPSchema = new mongoose.Schema({
    ip_address: {
        type: String,
        required: true,
        unique: true,
    },
});

const BlockedIP = mongoose.model('BlockedIP', blockedIPSchema);

module.exports = BlockedIP;
