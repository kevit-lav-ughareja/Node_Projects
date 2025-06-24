const express = require("express");

const router = express.Router();

const {
  handleGetAllUser,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
  handleInsertUser,
} = require("../controllers/user");

router.route("/").get(handleGetAllUser).post(handleInsertUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUser)
  .delete(handleDeleteUser);

module.exports = router;
