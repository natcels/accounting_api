const mongoose = require('mongoose');

const reportsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    queryParameters: {
        // Define query parameters for generating the specific report
    }
});

module.exports = mongoose.model('Report', reportsSchema);
