const Deduction = require('../models/_deduction.model');

// Create a new deduction
exports.createDeduction = (req, res) => {
    const deductionData = req.body;
    const newDeduction = new Deduction(deductionData);

    newDeduction
        .save()
        .then((deduction) => {
            res.status(200).send(deduction);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

// Get all deductions
exports.getDeductions = (req, res) => {
    Deduction.find()
        .exec()
        .then((deductions) => {
            res.status(200).send(deductions);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

// Get deduction by ID
exports.getDeductionById = (req, res) => {
    const deductionId = req.params.id;

    Deduction.findById(deductionId)
        .exec()
        .then((deduction) => {
            if (!deduction) {
                res.status(404).send({ message: 'Deduction not found' });
            } else {
                res.status(200).send(deduction);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

// Update deduction
exports.updateDeduction = (req, res) => {
    const deductionId = req.params.id;
    const updatedDeductionData = req.body;

    Deduction.findByIdAndUpdate(deductionId, updatedDeductionData, { new: true })
        .then((deduction) => {
            if (!deduction) {
                res.status(404).send({ message: 'Deduction not found' });
            } else {
                res.status(200).send(deduction);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

// Delete deduction
exports.deleteDeduction = (req, res) => {
    const deductionId = req.params.id;

    Deduction.findByIdAndRemove(deductionId)
        .then((deduction) => {
            if (!deduction) {
                res.status(404).send({ message: 'Deduction not found' });
            } else {
                res.status(200).send({ message: 'Deduction deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
