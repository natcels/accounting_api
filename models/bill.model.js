const mongoose = require("mongoose");

const billItemSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    Item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: false
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: false
    },
    unitItemCost: {
        type: Number,
        required: false
    },
    qty: { type: Number, defaultValue: 1 },
}, { timestamps: true });

const billSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    status: String,
    _date: { type: Number, defaultValue: Date.now(), required: true },
    dueDate: { type: Number, defaultValue: Date.now(), required: true },
    billItems: [billItemSchema]
}, { timestamps: true });

billSchema.statics.findByPatient = function (patientID) {
    const Bill = this;
    return Bill.find({ patientID });
};


module.exports = mongoose.model("Bill", billSchema);
module.exports = mongoose.model("BillItem", billItemSchema);