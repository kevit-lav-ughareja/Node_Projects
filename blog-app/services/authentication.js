const JWT = require("jsonwebtoken");
const secret = "$#WD%GBD$E^&%^D%5D5";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function validateUserToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateUserToken,
};
