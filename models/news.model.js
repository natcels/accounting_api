const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    headlines: { type: String, required: true, minLength: 3, index: true },
    synopsis: { type: String, required: true, minLength: 3, maxLength: 100 },
    story: {
        type: String,
        minLength: 3,
    }
})

module.exports = mongoose.model("News", newsSchema);