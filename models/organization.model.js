const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        minLength: 3,
        required: true,
        index: true,
        unique: true
    },
    logo_url: String,
    address: String,
    email: {
        type: String,
        index: true,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,

    },
    phone: {
        type: String,
        index: true,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model("Organization", organizationSchema)