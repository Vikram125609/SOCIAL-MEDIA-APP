const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: ['true', 'Please enter the first name ']
    },
    last_name: {
        type: String,
        required: ['true', 'Please enter the last name']
    },
    image: {
        type: String,
        default: ""
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Credential'
    },
    block_user: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
    follow_user: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;