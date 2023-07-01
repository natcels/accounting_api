const User = require('./../models/user.model');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByCredentials(email, password);

        if (user) {
            const session = await user.createSession();
            const refreshToken = await user.generateRefreshToken();
            const accessToken = await user.generateAccessToken();

            return res.send({ refreshToken, accessToken });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.logout = (req, res) => {
    const { userId, refreshToken } = req;

    User.findOneAndUpdate(
        { _id: userId },
        {
            $pull: {
                sessions: { token: refreshToken },
            },
        }
    )
        .then(() => {
            res.status(200).send();
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.signup = (req, res) => {
    const userInfo = req.body;
    const newUser = new User(userInfo);

    newUser
        .save()
        .then(() => {
            res.status(200).send(newUser);
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.updateUser = (req, res) => {
    const body = req.body;
    delete body.sessions;

    User.findByIdAndUpdate(req.userId, body)
        .then(() => {
            res.status(200).send();
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.getAccessToken = (req, res) => {
    const { userObj } = req;

    userObj
        .generateAccessToken()
        .then((accessToken) => {
            res.header("x-access-token", accessToken).send();
        })
        .catch((error) => {
            res.status(400).send(error);
        });
};

exports.getUsers = (req, res) => {
    User.find()
        .sort({ lastname: -1 })
        .exec()
        .then((users) => {
            res.status(200).send(users);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
