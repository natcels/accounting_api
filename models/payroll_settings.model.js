const mongoose = require('mongoose');

const payrollSettingsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    taxRate: {
        type: Number,
        required: true
    },
    overtimeRules: {
        // Define overtime rules according to your requirements
    },
    bonusCalculations: {
        // Define bonus calculations according to your requirements
    },
    // Add any other fields related to payroll settings
});

module.exports = mongoose.model('PayrollSettings', payrollSettingsSchema);
