const Organization = require('../models/organization.model');
const upload = require('./../utils/handle_uploads');

exports.createOrganization = (req, res) => {
    const organizationData = req.body;
    const newOrganization = new Organization(organizationData);

    newOrganization
        .save()
        .then((organization) => {
            res.status(200).send(organization);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.getOrganizationById = (req, res) => {
    const organizationId = req.params.id;

    Organization.findById(organizationId)
        .exec()
        .then((organization) => {
            if (!organization) {
                res.status(404).send({ message: 'Organization not found' });
            } else {
                res.status(200).send(organization);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.updateOrganization = (req, res) => {
    const organizationId = req.params.id;
    const updatedOrganizationData = req.body;

    Organization.findByIdAndUpdate(
        organizationId,
        updatedOrganizationData,
        { new: true }
    )
        .then((organization) => {
            if (!organization) {
                res.status(404).send({ message: 'Organization not found' });
            } else {
                res.status(200).send(organization);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.deleteOrganization = (req, res) => {
    const organizationId = req.params.id;

    Organization.findByIdAndRemove(organizationId)
        .then((organization) => {
            if (!organization) {
                res.status(404).send({ message: 'Organization not found' });
            } else {
                res.status(200).send({ message: 'Organization deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getAllOrganizations = (req, res) => {
    Organization.find()
        .exec()
        .then((organizations) => {
            res.status(200).send(organizations);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
exports.uploadLogo = upload.single('organizationLogo');