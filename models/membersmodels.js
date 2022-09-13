const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const memberschem = new Schema({
  name: String,
  email: String,
  city: String,
  exists: Boolean,
});

module.exports = mongoose.model("Members", memberschem);
