const Expense = require('../models/expense.model');

// Create a new expense
exports.createExpense = (req, res) => {
    const expenseData = req.body;
    const newExpense = new Expense(expenseData);

    newExpense
        .save()
        .then((expense) => {
            res.status(200).send(expense);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

// Get all expenses
exports.getExpenses = (req, res) => {
    Expense.find()
        .exec()
        .then((expenses) => {
            res.status(200).send(expenses);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

// Get expense by ID
exports.getExpenseById = (req, res) => {
    const expenseId = req.params.id;

    Expense.findById(expenseId)
        .exec()
        .then((expense) => {
            if (!expense) {
                res.status(404).send({ message: 'Expense not found' });
            } else {
                res.status(200).send(expense);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

// Update expense
exports.updateExpense = (req, res) => {
    const expenseId = req.params.id;
    const updatedExpenseData = req.body;

    Expense.findByIdAndUpdate(expenseId, updatedExpenseData, { new: true })
        .then((expense) => {
            if (!expense) {
                res.status(404).send({ message: 'Expense not found' });
            } else {
                res.status(200).send(expense);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

// Delete expense
exports.deleteExpense = (req, res) => {
    const expenseId = req.params.id;

    Expense.findByIdAndRemove(expenseId)
        .then((expense) => {
            if (!expense) {
                res.status(404).send({ message: 'Expense not found' });
            } else {
                res.status(200).send({ message: 'Expense deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
