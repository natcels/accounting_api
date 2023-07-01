const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        index: true
    },
    lastName: {
        type: String,
        required: true,
        minLength: 3,
        index: true
    },
    resumeUrl: String,
    applicationStatus: String,
    interviewDate: Number,

});

applicationSchema.statics.findByApplicant = function (firstName, lastName) {
    const Application = this;
    return Application.find({
        firstName,
        lastName
    });
};

module.exports = mongoose.model("Application", applicationSchema);