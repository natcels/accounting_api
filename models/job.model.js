const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    responsibilities: {
        type: [String],
        required: true,
    },

});

module.exports = mongoose.model('Job', jobSchema);
