const mongoose = require('mongoose');

const { Genders, Roles } = require('./constants');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true,
            dropDups: true
        }
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(Roles),
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: Object.values(Genders),
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

//Export the model
module.exports = mongoose.model('Users', userSchema);
