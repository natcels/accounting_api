const Profile = require('../models/profile.model');
//const upload = require('./../utils/handle_uploads');


exports.updateProfilePicture = (req, res) => {
    const profileId = req.params.id;
    const profilePicture = req.file.path; // Assuming you are using a middleware like Multer for file upload

    Profile.findByIdAndUpdate(
        profileId,
        { profilePicture },
        { new: true }
    )
        .then((profile) => {
            res.status(200).send(profile);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.updateAvatar = (req, res) => {
    const profileId = req.params.id;
    const avatar = req.file.path;

    Profile.findByIdAndUpdate(
        profileId,
        { avatar },
        { new: true }
    )
        .then((profile) => {
            res.status(200).send(profile);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};


//exports.uploadProfilePicture = upload.single('profilePicture');

exports.createProfile = (req, res) => {
    const profileData = req.body;
    const newProfile = new Profile(profileData);

    newProfile
        .save()
        .then((profile) => {
            res.status(200).send(profile);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.getProfileById = (req, res) => {
    const profileId = req.params.id;

    Profile.findById(profileId)
        .exec()
        .then((profile) => {
            if (!profile) {
                res.status(404).send({ message: 'Profile not found' });
            } else {
                res.status(200).send(profile);
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.updateProfile = (req, res) => {
    const profileId = req.params.id;
    const updatedProfileData = req.body;

    Profile.findByIdAndUpdate(profileId, updatedProfileData, { new: true })
        .then((profile) => {
            if (!profile) {
                res.status(404).send({ message: 'Profile not found' });
            } else {
                res.status(200).send(profile);
            }
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.deleteProfile = (req, res) => {
    const profileId = req.params.id;

    Profile.findByIdAndRemove(profileId)
        .then((profile) => {
            if (!profile) {
                res.status(404).send({ message: 'Profile not found' });
            } else {
                res.status(200).send({ message: 'Profile deleted successfully' });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

