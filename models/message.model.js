const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: {
        type: String,
        required: true
    },
    attatchmentts: Array()
});

module.exports = mongoose.Model("Mssaage", messageSchema);