const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

exports.generateSecret = (req, res, next) => {
    const { email } = req.body;

    const secret = speakeasy.generateSecret();

    qrcode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
        if (err) {
            res.status(500).send({ error: 'Failed to generate QR code' });
        } else {

            User.findOneAndUpdate({ email }, { secret: secret.base32 })
                .exec()
                .then(() => {
                    res.status(200).send({ secret: secret.base32, qrcode: dataUrl });
                })
                .catch((error) => {
                    res.status(500).send({ error: 'Failed to save secret key' });
                });
        }
    });
};

exports.verifyToken = (req, res, next) => {
    const { email, token } = req.body;

    User.findOne({ email })
        .exec()
        .then((user) => {
            if (!user || !user.secret) {
                res.status(400).send({ error: 'Invalid user or secret key not found' });
            } else {
                const verified = speakeasy.totp.verify({
                    secret: user.secret,
                    encoding: 'base32',
                    token: token,
                });

                if (verified) {
                    next();
                } else {
                    res.status(401).send({ error: 'Invalid verification token' });
                }
            }
        })
        .catch((error) => {
            res.status(500).send({ error: 'Failed to retrieve user or secret key' });
        });
};
