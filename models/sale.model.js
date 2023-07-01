const mongoose = require('mongoose');

const saleItemSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    unitPrice: Number,
    qty: Number
}, { timestamps: true })

const saleSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    _date: Date,
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    paymentStatus: { type: String, required: true },
    items: [saleItem]

}, { timestamps: true });

module.exports = mongoose.model("SaleItem", saleItemSchema);
module.exports = mongoose.model("Sale", saleSchema);