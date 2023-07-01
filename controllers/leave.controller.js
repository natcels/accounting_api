const Leave = require('../models/leave.model');

exports.createLeave = (req, res) => {
    const leaveData = req.body;
    const newLeave = new Leave(leaveData);

    newLeave
        .save()
        .then((leave) => {
            res.status(200).send(leave);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.getLeaveById = (req, res) => {
    const leaveId = req.params.id;

    Leave.findById(leaveId)
        .exec()
        .then((leave) => {
            if (!leave) {
                res.status(404).send({ message: 'Leave not found' });
            } else {
                res.status(200).send(leave);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.updateLeave = (req, res) => {
    const leaveId = req.params.id;
    const updatedLeaveData = req.body;

    Leave.findByIdAndUpdate(leaveId, updatedLeaveData, { new: true })
        .then((leave) => {
            if (!leave) {
                res.status(404).send({ message: 'Leave not found' });
            } else {
                res.status(200).send(leave);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.deleteLeave = (req, res) => {
    const leaveId = req.params.id;

    Leave.findByIdAndRemove(leaveId)
        .then((leave) => {
            if (!leave) {
                res.status(404).send({ message: 'Leave not found' });
            } else {
                res.status(200).send({ message: 'Leave deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getAllLeaves = (req, res) => {
    Leave.find()
        .exec()
        .then((leaves) => {
            res.status(200).send(leaves);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getLeavesByEmployeeId = (req, res) => {
    const employeeId = req.params.employeeId;

    Leave.find({ employeeId })
        .exec()
        .then((leaves) => {
            res.status(200).send(leaves);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
