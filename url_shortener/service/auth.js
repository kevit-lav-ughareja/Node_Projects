const jwt = require("jsonwebtoken");
const secretkey = "@#$lad$%4!@#$#2";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secretkey
  );
}
function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secretkey);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
