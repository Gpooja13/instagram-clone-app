const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Photo: {
    type: String,
    default:"https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
  },
  followers: [{ type: ObjectId, ref: "USER" }],
  following: [{ type: ObjectId, ref: "USER" }],
});

mongoose.model("USER", userSchema);
