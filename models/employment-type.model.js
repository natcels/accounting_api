const mongoose = require('mongoose');

const empTypesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    },
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    payFreq: String,
    hourRate: Number,
    maxHourLength: {
        type: Number,
        defaultValue: 8
    },
    overtimeRate: Number,
    maxOvertime: Number,

});

module.exports = mongoose.model("EmploymentType", empTypesSchema);