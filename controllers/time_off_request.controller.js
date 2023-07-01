const TimeOffRequest = require('../models/time_off_requests.model');

exports.createTimeOffRequest = (req, res) => {
    const timeOffRequestData = req.body;
    const newTimeOffRequest = new TimeOffRequest(timeOffRequestData);

    newTimeOffRequest
        .save()
        .then((timeOffRequest) => {
            res.status(200).send(timeOffRequest);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.getTimeOffRequestById = (req, res) => {
    const timeOffRequestId = req.params.id;

    TimeOffRequest.findById(timeOffRequestId)
        .exec()
        .then((timeOffRequest) => {
            if (!timeOffRequest) {
                res.status(404).send({ message: 'Time off request not found' });
            } else {
                res.status(200).send(timeOffRequest);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.updateTimeOffRequest = (req, res) => {
    const timeOffRequestId = req.params.id;
    const updatedTimeOffRequestData = req.body;

    TimeOffRequest.findByIdAndUpdate(timeOffRequestId, updatedTimeOffRequestData, { new: true })
        .then((timeOffRequest) => {
            if (!timeOffRequest) {
                res.status(404).send({ message: 'Time off request not found' });
            } else {
                res.status(200).send(timeOffRequest);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.deleteTimeOffRequest = (req, res) => {
    const timeOffRequestId = req.params.id;

    TimeOffRequest.findByIdAndRemove(timeOffRequestId)
        .then((timeOffRequest) => {
            if (!timeOffRequest) {
                res.status(404).send({ message: 'Time off request not found' });
            } else {
                res.status(200).send({ message: 'Time off request deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getAllTimeOffRequests = (req, res) => {
    TimeOffRequest.find()
        .exec()
        .then((timeOffRequests) => {
            res.status(200).send(timeOffRequests);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
