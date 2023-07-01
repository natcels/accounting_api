const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }]
});

trainingSchema.methods.getEnrolledEmployees = function () {
    return this.model('Employee').find({ _id: { $in: this.employees } });
};

trainingSchema.statics.findByEmployee = function (employeeId) {
    return this.find({ employees: employeeId });
};

module.exports = mongoose.model('Training', trainingSchema);
