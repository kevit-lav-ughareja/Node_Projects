const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  profileImage: {
    type: String,
    default: "../public/images/profile.png",
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString("hex");
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashPassword;

  next();
});

userSchema.static(
  "matchPasswordAndGenarateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User not Found");

    const salt = user.salt;
    const hashPassword = user.password;

    const userProvidedPasword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (hashPassword !== userProvidedPasword)
      throw new Error("Password is Incorrect");

    const token = createTokenForUser(user);
    return token;
  }
);
const User = model("user", userSchema);

module.exports = User;
