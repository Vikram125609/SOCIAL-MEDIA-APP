const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friend_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;