const mongoose = require('mongoose');

const leaveTypeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    description: {
        type: String
    },

});

module.exports = mongoose.model('LeaveType', leaveTypeSchema);
