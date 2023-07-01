const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LeaveType',
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model('Leave', leaveSchema);
