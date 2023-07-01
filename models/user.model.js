const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  status: {
    type: String,
    required: true,
    enum: ["Verified", "Unverified"],
    default: "Unverified"
  },
  userType: { type: String, required: true, trim: true, minlength: 3, default: "Guest" },
  sessions: [
    {
      token: { type: String, required: true },
      expiresAt: { type: Number, required: true },
    },
  ],
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.sessions;
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.statics.getJWTSecret = () => {
  return process.env.JWT_KEY;
};

userSchema.statics.findByIdAndToken = function (_id, token) {
  const User = this;
  return User.findOne({ _id, "sessions.token": token }).lean();
};

userSchema.statics.findByCredentials = async function (email, password) {
  const User = this;
  const user = await User.findOne({ email }).exec();
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  return user;
};

userSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
  const currentDateTime = Date.now() / 1000;
  return expiresAt <= currentDateTime;
};

userSchema.methods.generateAccessToken = function () {
  const user = this;
  return new Promise((resolve, reject) => {
    jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: "10m" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

userSchema.methods.generateRefreshToken = function () {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);
      const token = buf.toString("hex");
      resolve(token);
    });
  });
};

userSchema.methods.createSession = async function () {
  const user = this;
  const refreshToken = await user.generateRefreshToken();
  const expiresAt = generateRefreshTokenExpiryTime();

  user.sessions.push({ token: refreshToken, expiresAt });
  await user.save();

  return refreshToken;
};

const generateRefreshTokenExpiryTime = () => {
  const daysUntilExpire = 3;
  const secondsUntilExpire = daysUntilExpire * 24 * 60 * 60;
  return Date.now() / 1000 + secondsUntilExpire;
};

module.exports = mongoose.model("User", userSchema);
