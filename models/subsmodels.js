const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subsschema = new Schema({
  memberId: String,
  movies: Array,
});

module.exports = mongoose.model("Subs", subsschema);
