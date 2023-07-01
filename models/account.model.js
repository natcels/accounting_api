const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        maxLength: 100,
        required: true,
        index: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    },
    OpeningBalance: {
        type: Number,
        min: 0.00,
        defaultValue: 0.00,
        required: true
    },
});

userSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
module.exports = mongoose.model("Account", accountSchema);