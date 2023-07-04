const mongoose = require('mongoose');

const taxSchema = new mongoose.Schema({
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
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
}, { timestamps: true });

const Tax = mongoose.model('Tax', taxSchema);

module.exports = Tax;
