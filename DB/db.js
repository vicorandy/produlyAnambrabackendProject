/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect("mongodb://localhost:27017");
}

module.exports = connectDB;
// `mongodb+srv://vicorandy:${process.env.DBPASSWORD}@cluster0.gfx0plx.mongodb.net/?retryWrites=true&w=majority`
