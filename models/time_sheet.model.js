const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model('Timesheet', timesheetSchema);
