const Bill = require('./../models/bill.model');

exports.getAll = async (req, res) => {
    try {
        const bills = Bill.find({});
        if (!bills) {
            return res.status(404).send();
        }
        res.status(200).send(bills);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getCustomerBill = async (req, res) => {
    try {
        const bills = await Bill.findByCustomer(req.body.customerId).populate();
        if (!bills) {
            return res.status(404).send();
        }
        res.status(200).send(bills);
    } catch (error) {
        res.status(500).send(error);

    }
}