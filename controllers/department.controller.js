const Department = require('../models/department.model');

exports.createDepartment = (req, res) => {
    const departmentData = req.body;
    const newDepartment = new Department(departmentData);

    newDepartment
        .save()
        .then((department) => {
            res.status(200).send(department);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.getDepartmentById = (req, res) => {
    const departmentId = req.params.id;

    Department.findById(departmentId)
        .exec()
        .then((department) => {
            if (!department) {
                res.status(404).send({ message: 'Department not found' });
            } else {
                res.status(200).send(department);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.updateDepartment = (req, res) => {
    const departmentId = req.params.id;
    const updatedDepartmentData = req.body;

    Department.findByIdAndUpdate(
        departmentId,
        updatedDepartmentData,
        { new: true }
    )
        .then((department) => {
            if (!department) {
                res.status(404).send({ message: 'Department not found' });
            } else {
                res.status(200).send(department);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.deleteDepartment = (req, res) => {
    const departmentId = req.params.id;

    Department.findByIdAndRemove(departmentId)
        .then((department) => {
            if (!department) {
                res.status(404).send({ message: 'Department not found' });
            } else {
                res.status(200).send({ message: 'Department deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getAllDepartments = (req, res) => {
    Department.find()
        .exec()
        .then((departments) => {
            res.status(200).send(departments);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
