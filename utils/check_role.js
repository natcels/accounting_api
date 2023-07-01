exports.checkRole = (role) => {
    return (req, res, next) => {
        if (req.userObj.role === role) {
            next();
        } else {
            res.status(403).send({ error: "Access denied" });
        }
    };
};
