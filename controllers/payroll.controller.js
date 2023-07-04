const Payroll = require('../models/payroll.model');

// Get all payrolls for a specific organization
exports.getPayrolls = async (req, res) => {
    try {
        const organizationId = req.params.organizationId;
        const payrolls = await Payroll.find({ organizationId });
        res.json(payrolls);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new payroll for a specific organization
exports.createPayroll = async (req, res) => {
    try {
        const organizationId = req.params.organizationId;
        const payrollData = req.body;
        payrollData.organizationId = organizationId;
        const payroll = await Payroll.create(payrollData);
        res.status(201).json(payroll);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a specific payroll for a specific organization
exports.getPayroll = async (req, res) => {
    try {
        const organizationId = req.params.organizationId;
        const payrollId = req.params.payrollId;
        const payroll = await Payroll.findOne({ _id: payrollId, organizationId });
        if (!payroll) {
            res.status(404).json({ error: 'Payroll not found' });
        } else {
            res.json(payroll);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a specific payroll for a specific organization
exports.updatePayroll = async (req, res) => {
    try {
        const organizationId = req.params.organizationId;
        const payrollId = req.params.payrollId;
        const payrollData = req.body;
        const updatedPayroll = await Payroll.findOneAndUpdate(
            { _id: payrollId, organizationId },
            payrollData,
            { new: true }
        );
        if (!updatedPayroll) {
            res.status(404).json({ error: 'Payroll not found' });
        } else {
            res.json(updatedPayroll);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a specific payroll for a specific organization
exports.deletePayroll = async (req, res) => {
    try {
        const organizationId = req.params.organizationId;
        const payrollId = req.params.payrollId;
        const deletedPayroll = await Payroll.findOneAndDelete({ _id: payrollId, organizationId });
        if (!deletedPayroll) {
            res.status(404).json({ error: 'Payroll not found' });
        } else {
            res.json(deletedPayroll);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
