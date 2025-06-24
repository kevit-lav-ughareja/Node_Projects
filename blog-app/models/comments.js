const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "blog",
    required: true,
  },
});

const Comments = model("comments", userSchema);

module.exports = Comments;
