const mongoose = require('mongoose');

const reportsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {
        type: String,
        required: true
    },
    queryParameters: {
        // Define query parameters for generating the specific report
    }
});

module.exports = mongoose.model('Report', reportsSchema);
