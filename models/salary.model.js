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
    deductions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Deduction",
        }
    ],

});

module.exports = {
    Allowance: mongoose.model('Allowance', allowanceSchema),
    Bonus: mongoose.model('Bonus', bonusSchema),
    Salary: mongoose.model('Salary', salarySchema),
};
