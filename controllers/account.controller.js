const Account = require('./../models/account.model');

exports.getAll = async (req, res) => {
    try {
        const accounts = await Account.find({});
        if (!accounts) {
            return res.status(404).send();
        }
        res.status(200).send(accounts);
    } catch (error) {
        res.status(500).send(error);

    }
}


exports.getAccount = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).send();
        }
        res.status(200).send(account);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndDelete(req.params.id);
        if (!account) {
            return res.status(404).send();
        }
        res.send(account);

    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateAccount = async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!account) {
            return res.status(404).send();
        }
        res.status(200).send(account);

    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createAccount = async (req, res) => {
    const account = new Account(req.body);
    try {
        await account.save();
        res.status(201).send(account);

    }
    catch (error) {
        res.status(500)
    }
};