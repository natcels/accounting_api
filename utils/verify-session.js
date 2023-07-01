const User = require("./../models/user.model");
const bodyp = require("body-parser");

exports.verifySession = (req, res, next) => {
  const refreshToken = req.header("x-refresh-token");
  const _id = req.header("_id");

  User.findByIdAndToken(_id, refreshToken)
    .then((user) => {
      if (!user) {
        return Promise.reject({
          error: "Refresh token has expired or the session is invalid",
        });
      }
      let isSessionValid = false;

      user.sessions.forEach((session) => {
        if (session.token === refreshToken) {
          if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
            isSessionValid = true;
          }
        }
      });

      if (isSessionValid) {
        req.userId = user._id;
        req.userObj = user;
        req.refreshToken = refreshToken;

        next();
      } else {
        return Promise.reject({
          error: "Refresh token has expired or the session is invalid",
        });
      }
    })
    .catch((e) => {
      res.status(401).send(e);
    });
};
