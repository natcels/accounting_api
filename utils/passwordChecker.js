exports.validatePassword = (req, res, next) => {
    const password = req.body.password;

    // Regular expressions for password requirements
    const lengthRegex = /.{6,}/;
    const digitRegex = /\d/;
    const specialCharRegex = /[^a-zA-Z0-9]/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    // Check if password meets all requirements
    if (
        lengthRegex.test(password) &&
        digitRegex.test(password) &&
        specialCharRegex.test(password) &&
        uppercaseRegex.test(password) &&
        lowercaseRegex.test(password)
    ) {
        next();
    } else {
        res.status(400).send({
            error:
                "Invalid Password String",
        });
    }
};
