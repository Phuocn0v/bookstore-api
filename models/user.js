const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    roles: Array
});

const User = mongoose.model('users', userSchema);
module.exports = User;
