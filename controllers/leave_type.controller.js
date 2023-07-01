const LeaveType = require('../models/leaveType.model');

exports.createLeaveType = (req, res) => {
    const leaveTypeData = req.body;
    const newLeaveType = new LeaveType(leaveTypeData);

    newLeaveType
        .save()
        .then((leaveType) => {
            res.status(200).send(leaveType);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.getLeaveTypes = (req, res) => {
    LeaveType.find()
        .select()
        .exec()
        .then((leaveTypes) => {
            res.status(200).send(leaveTypes);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getLeaveTypeById = (req, res) => {
    const leaveTypeId = req.params.id;

    LeaveType.findById(leaveTypeId)
        .exec()
        .then((leaveType) => {
            if (!leaveType) {
                res.status(404).send({ message: 'Leave type not found' });
            } else {
                res.status(200).send(leaveType);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.updateLeaveType = (req, res) => {
    const leaveTypeId = req.params.id;
    const updatedLeaveTypeData = req.body;

    LeaveType.findByIdAndUpdate(leaveTypeId, updatedLeaveTypeData, { new: true })
        .then((leaveType) => {
            if (!leaveType) {
                res.status(404).send({ message: 'Leave type not found' });
            } else {
                res.status(200).send(leaveType);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.deleteLeaveType = (req, res) => {
    const leaveTypeId = req.params.id;

    LeaveType.findByIdAndRemove(leaveTypeId)
        .then((leaveType) => {
            if (!leaveType) {
                res.status(404).send({ message: 'Leave type not found' });
            } else {
                res.status(200).send({ message: 'Leave type deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
