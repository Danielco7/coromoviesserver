const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usersschema = new Schema({
    fname:String,
    Lname:String,
    username:String,
    password:String,
    premissions:Array,
    admin:Boolean
})

module.exports = mongoose.model('Users', usersschema);
