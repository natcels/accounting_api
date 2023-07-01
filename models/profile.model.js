const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    middleName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },

    phoneNumber: {
        type: Number,
        maxlength: 15
    },
    address: {
        type: String,
        unique: true
    },
    maritalStatus: {
        type: String,
    },
    avatar: { type: String, required: false },
    profilePic: String,
    employmentStatus: String,


    dateOfBirth: { type: Date },

    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    religiousAffiliations: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        required: true,
    },
    nextOfKin: {
        type: String,
        required: true,
    },
    educationalQualifications: [{
        institute: String,
        degree: String,
        year: Number,
    }],

});

module.exports = mongoose.model('Profile', profileSchema);
