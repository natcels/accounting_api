const mongoose = require("mongoose");


const employeeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee_no: {
        index: true,
        unique: true,
        type: String
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Departments",
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    line_manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"

    },

    current_project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    grade_level: { type: Number, required: false },
    isActive: { type: Boolean, default: true },

    hireDate: { type: Date },
    terminationDate: { type: Date },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
    training: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training',
    }]
});


module.exports = mongoose.model('Employee', employeeSchema);
