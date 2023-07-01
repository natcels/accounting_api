const mongoose = require('mongoose');

var departmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',

    },
    code: {
        type: String,
        required: true
    },
});

departmentSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these propertiess when object is serialized
        delete ret._id;
    },
});

departmentSchema.methods.toJSON = function () {
    const department = this;
    const departmentObject = department.toObject();
    return _.omit(departmentObject, ["_id"]);

};

//Export the model
module.exports = mongoose.model('Department', departmentSchema);