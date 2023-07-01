const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    lead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],

});

const teamPerformanceSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    revenue: {
        type: Number,
        required: true,
    },
    projectCompletion: {
        type: Number,
        required: true,
    },

});

module.exports = {
    Team: mongoose.model('Team', teamSchema),
    TeamPerformance: mongoose.model('TeamPerformance', teamPerformanceSchema),
};
