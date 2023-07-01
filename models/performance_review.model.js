const mongoose = require('mongoose');

const performanceReviewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: String
    },
    ratings: {
        type: Number
    }
});

module.exports = mongoose.model('PerformanceReview', performanceReviewSchema);
