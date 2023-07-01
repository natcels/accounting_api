const mongoose = require('mongoose');


const allowanceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});

const deductionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    narration: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});


const bonusSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});

const salarySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    baseSalary: {
        type: Number,
        required: true,
    },
    allowances: [allowanceSchema],
    bonuses: [bonusSchema],
    deductions: [deductionSchema],

});




module.exports = {
    Allowance: mongoose.model('Allowance', allowanceSchema),
    Bonus: mongoose.model('Bonus', bonusSchema),
    Deduction: mongoose.model('Deduction', deductionSchema),
    Salary: mongoose.model('Salary', salarySchema),
};
