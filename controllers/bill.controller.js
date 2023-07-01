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

exports.getPatientBill = async (req, res) => {
    try {
        const bills = await Bill.findByPatient(req.body.patientID).populate();
        if (!bills) {
            return res.status(404).send();
        }
        res.status(200).send(bills);
    } catch (error) {
        res.status(500).send(error);

    }
}