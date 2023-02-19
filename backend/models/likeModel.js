const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    post_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    }
})

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;