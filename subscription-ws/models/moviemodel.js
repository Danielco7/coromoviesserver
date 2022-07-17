const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moviesschem = new Schema({
    name: {type: String, required: true},
    genres:Array,
    image:String,
    premired:Date,
})

module.exports = mongoose.model('Movies', moviesschem);
