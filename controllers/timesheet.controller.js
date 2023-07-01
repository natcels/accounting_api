const Timesheet = require('../models/time_sheet.model');

// Create a new timesheet
exports.createTimesheet = (req, res) => {
    const timesheetData = req.body;
    const newTimesheet = new Timesheet(timesheetData);

    newTimesheet
        .save()
        .then((timesheet) => {
            res.status(200).send(timesheet);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

// Get all timesheets
exports.getTimesheets = (req, res) => {
    Timesheet.find()
        .exec()
        .then((timesheets) => {
            res.status(200).send(timesheets);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

// Get timesheet by ID
exports.getTimesheetById = (req, res) => {
    const timesheetId = req.params.id;

    Timesheet.findById(timesheetId)
        .exec()
        .then((timesheet) => {
            if (!timesheet) {
                res.status(404).send({ message: 'Timesheet not found' });
            } else {
                res.status(200).send(timesheet);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

// Update timesheet
exports.updateTimesheet = (req, res) => {
    const timesheetId = req.params.id;
    const updatedTimesheetData = req.body;

    Timesheet.findByIdAndUpdate(timesheetId, updatedTimesheetData, { new: true })
        .then((timesheet) => {
            if (!timesheet) {
                res.status(404).send({ message: 'Timesheet not found' });
            } else {
                res.status(200).send(timesheet);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

// Delete timesheet
exports.deleteTimesheet = (req, res) => {
    const timesheetId = req.params.id;

    Timesheet.findByIdAndRemove(timesheetId)
        .then((timesheet) => {
            if (!timesheet) {
                res.status(404).send({ message: 'Timesheet not found' });
            } else {
                res.status(200).send({ message: 'Timesheet deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

// Get timesheets by employee ID
exports.getTimesheetsByEmployeeId = (req, res) => {
    const employeeId = req.params.employeeId;

    Timesheet.find({ employee: employeeId })
        .exec()
        .then((timesheets) => {
            res.status(200).send(timesheets);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
