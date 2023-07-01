const mongoose = require('mongoose');

const userTypeSchema = new mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },

});

const UserType = mongoose.model('UserType', userTypeSchema);

module.exports = {
    UserType,
};
