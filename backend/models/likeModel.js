const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6],
        default: 1
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
})

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;