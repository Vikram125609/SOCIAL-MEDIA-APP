const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
        required: ['true', 'Please enter the email']
    },
}, { timestamps: true }
);

const User = mongoose.model("Credential", userSchema);
module.exports = User;