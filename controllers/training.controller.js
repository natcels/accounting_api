const Training = require('../models/training.model');
const Employee = require('../models/employee.model');

exports.createTraining = (req, res) => {
    const trainingData = req.body;
    const newTraining = new Training(trainingData);

    newTraining
        .save()
        .then((training) => {
            res.status(200).send(training);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.getTrainingById = (req, res) => {
    const trainingId = req.params.id;

    Training.findById(trainingId)
        .populate('employees') // Populate the employees field
        .exec()
        .then((training) => {
            if (!training) {
                res.status(404).send({ message: 'Training not found' });
            } else {
                res.status(200).send(training);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.updateTraining = (req, res) => {
    const trainingId = req.params.id;
    const updatedTrainingData = req.body;

    Training.findByIdAndUpdate(trainingId, updatedTrainingData, { new: true })
        .then((training) => {
            if (!training) {
                res.status(404).send({ message: 'Training not found' });
            } else {
                res.status(200).send(training);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.deleteTraining = (req, res) => {
    const trainingId = req.params.id;

    Training.findByIdAndRemove(trainingId)
        .then((training) => {
            if (!training) {
                res.status(404).send({ message: 'Training not found' });
            } else {
                res.status(200).send({ message: 'Training deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getAllTrainings = (req, res) => {
    Training.find()
        .exec()
        .then((trainings) => {
            res.status(200).send(trainings);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getTrainingEmployees = (req, res) => {
    const trainingId = req.params.id;

    Training.findById(trainingId)
        .populate('employees') // Populate the employees field
        .exec()
        .then((training) => {
            if (!training) {
                res.status(404).send({ message: 'Training not found' });
            } else {
                res.status(200).send(training.employees);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getEmployeeTrainings = (req, res) => {
    const employeeId = req.params.id;

    Employee.findById(employeeId)
        .populate('trainings') // Populate the trainings field
        .exec()
        .then((employee) => {
            if (!employee) {
                res.status(404).send({ message: 'Employee not found' });
            } else {
                res.status(200).send(employee.trainings);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
