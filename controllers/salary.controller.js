const Salary = require('../models/salary.model');

exports.createSalary = (req, res) => {
    const salaryData = req.body;
    const newSalary = new Salary(salaryData);

    newSalary
        .save()
        .then((salary) => {
            res.status(200).send(salary);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.getSalaryById = (req, res) => {
    const salaryId = req.params.id;

    Salary.findById(salaryId)
        .exec()
        .then((salary) => {
            if (!salary) {
                res.status(404).send({ message: 'Salary not found' });
            } else {
                res.status(200).send(salary);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.updateSalary = (req, res) => {
    const salaryId = req.params.id;
    const updatedSalaryData = req.body;

    Salary.findByIdAndUpdate(salaryId, updatedSalaryData, { new: true })
        .then((salary) => {
            if (!salary) {
                res.status(404).send({ message: 'Salary not found' });
            } else {
                res.status(200).send(salary);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.deleteSalary = (req, res) => {
    const salaryId = req.params.id;

    Salary.findByIdAndRemove(salaryId)
        .then((salary) => {
            if (!salary) {
                res.status(404).send({ message: 'Salary not found' });
            } else {
                res.status(200).send({ message: 'Salary deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getSalaries = (req, res) => {
    Salary.find()
        .select()
        .exec()
        .then((salaries) => {
            res.status(200).send(salaries);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
};
