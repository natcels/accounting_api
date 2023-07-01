const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
    }],
});

const Role = mongoose.model('Role', roleSchema);

module.exports = {
    Role,
};
