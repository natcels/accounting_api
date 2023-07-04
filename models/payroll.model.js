const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
    month: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Deduction"
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
    taxes: {
        taxRate: {
            type: Number,
            required: true,
        },
        taxWithholdings: [{
            name: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
        }],
    },
}, { timestamps: true });

const Payroll = mongoose.model('Payroll', payrollSchema);

module.exports = Payroll;