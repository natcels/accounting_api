const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    arrivalTime: {
        type: Date,
        required: true,
    },
    departureTime: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Attendance', attendanceSchema);
