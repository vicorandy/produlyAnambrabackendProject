/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthorsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a product name"],
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
  },
});
AuthorsSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

AuthorsSchema.methods.createJWT = async function () {
  const secret = process.env.JWT_SECRET;
  const token = await jwt.sign(
    { authorName: this.name, authorId: this._id },
    secret
  );
  return token;
};

AuthorsSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};
module.exports = mongoose.model("Author", AuthorsSchema);
