const Attendance = require('../models/attendance.model');

exports.createAttendance = (req, res) => {
    const attendanceData = req.body;
    const newAttendance = new Attendance(attendanceData);

    newAttendance
        .save()
        .then((attendance) => {
            res.status(200).send(attendance);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};



exports.getAttendanceById = (req, res) => {
    const attendanceId = req.params.id;

    Attendance.findById(attendanceId)
        .exec()
        .then((attendance) => {
            if (!attendance) {
                res.status(404).send({ message: 'Attendance not found' });
            } else {
                res.status(200).send(attendance);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getAttendanceByEmployeeId = (req, res) => {
    const employeeId = req.params.employeeId;

    Attendance.find({ employee: employeeId })
        .exec()
        .then((attendances) => {
            res.status(200).send(attendances);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};


exports.updateAttendance = (req, res) => {
    const attendanceId = req.params.id;
    const updatedAttendanceData = req.body;

    Attendance.findByIdAndUpdate(attendanceId, updatedAttendanceData, { new: true })
        .then((attendance) => {
            if (!attendance) {
                res.status(404).send({ message: 'Attendance not found' });
            } else {
                res.status(200).send(attendance);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.deleteAttendance = (req, res) => {
    const attendanceId = req.params.id;

    Attendance.findByIdAndRemove(attendanceId)
        .then((attendance) => {
            if (!attendance) {
                res.status(404).send({ message: 'Attendance not found' });
            } else {
                res.status(200).send({ message: 'Attendance deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getAttendances = (req, res) => {
    Attendance.find()
        .select()
        .exec()
        .then((attendances) => {
            res.status(200).send(attendances);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
};
