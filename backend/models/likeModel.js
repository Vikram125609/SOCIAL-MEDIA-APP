const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    likeType: {
        type: Number,
        enum: [1, 2, 3],
        default: 1,
    }
    // post_id: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Post'
    // }
})

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;