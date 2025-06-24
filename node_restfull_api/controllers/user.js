const User = require("../models/user");

async function handleGetAllUser(req, res) {
  const allDbUser = await User.find({});
  return res.json(allDbUser);
}
async function handleGetUserById(req, res) {
  id = req.params.id;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: "User Not Found" });
  return res.json(user);
}
async function handleUpdateUser(req, res) {
  const id = req.params.id;
  await User.findByIdAndUpdate(id, { lastName: "Shyam" });
  return res.json({ status: "updated", id });
}
async function handleDeleteUser(req, res) {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.json({ status: "deleted", id });
}
async function handleInsertUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All field Required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log(result);
  return res.status(201).json({ msg: "success", id: result._id });
}

module.exports = {
  handleGetAllUser,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
  handleInsertUser,
};
