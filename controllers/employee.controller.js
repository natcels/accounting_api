const Employee = require('../models/employee.model');

exports.createEmployee = (req, res) => {
    const employeeData = req.body;
    const newEmployee = new Employee(employeeData);

    newEmployee
        .save()
        .then((employee) => {
            res.status(200).send(employee);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.getEmployeeById = (req, res) => {
    const employeeId = req.params.id;

    Employee.findById(employeeId)
        .populate('profile')
        .exec()
        .then((employee) => {
            if (!employee) {
                res.status(404).send({ message: 'Employee not found' });
            } else {
                res.status(200).send(employee);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.updateEmployee = (req, res) => {
    const employeeId = req.params.id;
    const updatedEmployeeData = req.body;

    Employee.findByIdAndUpdate(employeeId, updatedEmployeeData, { new: true })
        .then((employee) => {
            if (!employee) {
                res.status(404).send({ message: 'Employee not found' });
            } else {
                res.status(200).send(employee);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.deleteEmployee = (req, res) => {
    const employeeId = req.params.id;

    Employee.findByIdAndRemove(employeeId)
        .then((employee) => {
            if (!employee) {
                res.status(404).send({ message: 'Employee not found' });
            } else {
                res.status(200).send({ message: 'Employee deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getAllEmployees = (req, res) => {
    Employee.find()
        .populate('profile')
        .exec()
        .then((employees) => {
            res.status(200).send(employees);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
