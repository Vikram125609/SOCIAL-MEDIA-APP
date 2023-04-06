const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    follow_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Follow = mongoose.model('Follow', followSchema);
module.exports = Follow;