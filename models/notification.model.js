const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    title: {
        type: string,
        required: true,
        minLength: 3,
        maxlength: 100,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Employee"
    },
    message: {
        type: String,
        minLength: 3,
        maxLength: 250,
        required: true
    },
    _date: {
        type: Number,
        required: true,
        default: Date.now()
    },


});

module.exports = mongoose.model("Notifications", notificationSchema);