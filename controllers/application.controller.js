const Application = require('./../models/application.model')

exports.getAll = async (req, res) => {
    try {
        const application = Application.find({});
        if (!application) {
            return res.status(404).send()
        }
        res.status(200).send(application);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getApplicantApplication = async (req, res) => {
    try {
        const application = await Application.findByApplicant(req.body.firstName, req.body.lastName);
        if (!application) {
            return res.status(404).send();
        }
        res.status(200).send(application);

    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id).populate();
        if (!application) {
            return res.status(404).send();
        }
        res.status(200).send(application);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.createApplication = async (req, res) => {
    const application = new Application(req.body);
    try {
        await application.save();
        if (!application) {
            return res.status(404).send()
        }
        res.status(201).send(application);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!application) {
            return res.status(404).send()
        }
        res.status(201).send(application);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);
        if (!application) {
            return res.status(404).send()
        }
        res.send(application);
    } catch (error) {
        res.status(500).send(error);
    }
};