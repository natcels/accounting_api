const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    deductions: [{
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    }],
    allowances: [{
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    }],
    netSalary: {
        type: Number,
        required: true,
    },
    payDate: {
        type: Date,
        required: true,
    },
    payMethod: {
        type: String,
        required: true,
    },
    hoursWorked: {
        type: Number,
        required: true,
    },
    leaveTaken: {
        type: Number,
        required: true,
    },
    taxId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tax',
        required: true,
    },
}, { timestamps: true });

const Payroll = mongoose.model('Payroll', payrollSchema);

module.exports = Payroll;
