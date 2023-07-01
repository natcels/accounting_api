const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

// Generate a new secret key and QR code for a user
exports.generateSecret = (req, res, next) => {
    const { email } = req.body;

    // Generate a new secret key for the user
    const secret = speakeasy.generateSecret();

    // Generate a QR code URL for the user to scan with an authenticator app
    qrcode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
        if (err) {
            res.status(500).send({ error: 'Failed to generate QR code' });
        } else {
            // Save the secret key to the user's record in the database
            // In this example, we assume there is a `User` model and a `secret` field to store the secret key
            User.findOneAndUpdate({ email }, { secret: secret.base32 })
                .exec()
                .then(() => {
                    // Send the secret key and QR code URL to the client
                    res.status(200).send({ secret: secret.base32, qrcode: dataUrl });
                })
                .catch((error) => {
                    res.status(500).send({ error: 'Failed to save secret key' });
                });
        }
    });
};

// Verify the provided verification code against the user's secret key
exports.verifyToken = (req, res, next) => {
    const { email, token } = req.body;

    // Retrieve the user's secret key from the database
    User.findOne({ email })
        .exec()
        .then((user) => {
            if (!user || !user.secret) {
                res.status(400).send({ error: 'Invalid user or secret key not found' });
            } else {
                // Verify the provided token against the user's secret key
                const verified = speakeasy.totp.verify({
                    secret: user.secret,
                    encoding: 'base32',
                    token: token,
                });

                if (verified) {
                    // Token is valid
                    next();
                } else {
                    // Token is invalid
                    res.status(401).send({ error: 'Invalid verification token' });
                }
            }
        })
        .catch((error) => {
            res.status(500).send({ error: 'Failed to retrieve user or secret key' });
        });
};
