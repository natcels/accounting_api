const mongoose = require('mongoose');

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



module.exports = mongoose.model('Deduction', deductionSchema);
