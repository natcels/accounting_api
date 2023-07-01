const mongoose = require("mongoose");
const projectStatus = {
    toDo: "To do",
    inProgress: "In Progress",
    completed: "Completed"
};
const projectSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    title: {
        type: String,
        minLength: 3,
        required: true,
        index: true,
        unique: true,
    },
    projectStatus: String,
    projectLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    startDate: Number,
    estimatedDuration: Number,

}, { timestamps: true });
module.exports = mongoose.model('Project', projectSchema);
