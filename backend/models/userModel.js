const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
        unique: true
    },
}, { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;