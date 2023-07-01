const Team = require('../models/team.model');

exports.createTeam = (req, res) => {
    const teamData = req.body;
    const newTeam = new Team(teamData);

    newTeam
        .save()
        .then((team) => {
            res.status(200).send(team);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.getTeamById = (req, res) => {
    const teamId = req.params.id;

    Team.findById(teamId)
        .populate('members', 'firstName lastName')
        .exec()
        .then((team) => {
            if (!team) {
                res.status(404).send({ message: 'Team not found' });
            } else {
                res.status(200).send(team);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.updateTeam = (req, res) => {
    const teamId = req.params.id;
    const updateData = req.body;

    Team.findByIdAndUpdate(teamId, updateData, { new: true })
        .then((team) => {
            if (!team) {
                res.status(404).send({ message: 'Team not found' });
            } else {
                res.status(200).send(team);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.deleteTeam = (req, res) => {
    const teamId = req.params.id;

    Team.findByIdAndRemove(teamId)
        .then((team) => {
            if (!team) {
                res.status(404).send({ message: 'Team not found' });
            } else {
                res.status(200).send({ message: 'Team deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getAllTeams = (req, res) => {
    Team.find()
        .exec()
        .then((teams) => {
            res.status(200).send(teams);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.addTeamMember = (req, res) => {
    const teamId = req.params.id;
    const memberId = req.body.memberId;

    Team.findByIdAndUpdate(
        teamId,
        { $addToSet: { members: memberId } },
        { new: true }
    )
        .then((team) => {
            if (!team) {
                res.status(404).send({ message: 'Team not found' });
            } else {
                res.status(200).send(team);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.removeTeamMember = (req, res) => {
    const teamId = req.params.id;
    const memberId = req.body.memberId;

    Team.findByIdAndUpdate(
        teamId,
        { $pull: { members: memberId } },
        { new: true }
    )
        .then((team) => {
            if (!team) {
                res.status(404).send({ message: 'Team not found' });
            } else {
                res.status(200).send(team);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};