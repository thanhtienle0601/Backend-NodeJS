const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  city: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
