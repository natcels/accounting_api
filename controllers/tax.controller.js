const Tax = require('../models/tax.model');

// Get all taxes for a specific organization
exports.getTaxes = async (req, res) => {
    try {
        const organizationId = req.params.organizationId;
        const taxes = await Tax.find({ organizationId });
        res.json(taxes);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create a new tax for a specific organization
exports.createTax = async (req, res) => {
    try {
        const organizationId = req.params.organizationId;
        const taxData = req.body;
        taxData.organizationId = organizationId;
        const tax = await Tax.create(taxData);
        res.status(201).json(tax);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a specific tax for a specific organization
exports.getTax = async (req, res) => {
    try {
        const organizationId = req.params.organizationId;
        const taxId = req.params.taxId;
        const tax = await Tax.findOne({ _id: taxId, organizationId });
        if (!tax) {
            res.status(404).json({ error: 'Tax not found' });
        } else {
            res.json(tax);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a specific tax for a specific organization
exports.updateTax = async (req, res) => {
    try {
        const organizationId = req.params.organizationId;
        const taxId = req.params.taxId;
        const taxData = req.body;
        const updatedTax = await Tax.findOneAndUpdate(
            { _id: taxId, organizationId },
            taxData,
            { new: true }
        );
        if (!updatedTax) {
            res.status(404).json({ error: 'Tax not found' });
        } else {
            res.json(updatedTax);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a specific tax for a specific organization
exports.deleteTax = async (req, res) => {
    try {
        const organizationId = req.params.organizationId;
        const taxId = req.params.taxId;
        const deletedTax = await Tax.findOneAndDelete({ _id: taxId, organizationId });
        if (!deletedTax) {
            res.status(404).json({ error: 'Tax not found' });
        } else {
            res.json(deletedTax);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
