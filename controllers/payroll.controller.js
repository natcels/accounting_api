const Payroll = require('../models/payroll.model');
const Employee = require('../models/employee.model');

// Create a new payroll
exports.createPayroll = async (req, res) => {
    try {
        const { month, year, employeeId, salary, organization, /* Other payroll fields... */ } = req.body;

        // Check if the employee exists
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }

        const payroll = new Payroll({
            month,
            year,
            employeeId,
            salary,
            organization,
            // Set other payroll fields...
        });

        const savedPayroll = await payroll.save();

        res.status(201).json(savedPayroll);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the payroll.' });
    }
};

// Get all payrolls
exports.getAllPayrolls = async (req, res) => {
    try {
        const payrolls = await Payroll.find().populate('employeeId');
        res.json(payrolls);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the payrolls.' });
    }
};

// Get a specific payroll by ID
exports.getPayrollById = async (req, res) => {
    try {
        const { id } = req.params;
        const payroll = await Payroll.findById(id).populate('employeeId');

        if (!payroll) {
            return res.status(404).json({ error: 'Payroll not found.' });
        }

        res.json(payroll);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the payroll.' });
    }
};

// Update a payroll
exports.updatePayroll = async (req, res) => {
    try {
        const { id } = req.params;
        const { month, year, employeeId, salary, /* Other payroll fields... */ } = req.body;

        // Check if the employee exists
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found.' });
        }

        const payroll = await Payroll.findByIdAndUpdate(
            id,
            {
                month,
                year,
                employeeId,
                salary,
                // Update other payroll fields...
            },
            { new: true } // Return the updated payroll
        ).populate('employeeId');

        if (!payroll) {
            return res.status(404).json({ error: 'Payroll not found.' });
        }

        res.json(payroll);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the payroll.' });
    }
};

// Delete a payroll
exports.deletePayroll = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPayroll = await Payroll.findByIdAndRemove(id).populate('employeeId');

        if (!deletedPayroll) {
            return res.status(404).json({ error: 'Payroll not found.' });
        }

        res.json(deletedPayroll);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the payroll.' });
    }
};
