const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        minLength: 3,
        rquired: true,
        index: true
    },
    AssignedTo: [],
    status: String,
    startDate: Date,
    Deadline: Date,
});

module.exports = mongoose.model("Task", taskSchema);