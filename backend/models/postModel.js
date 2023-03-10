const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        required: [true, 'Please provide the image url']
    },
    description: {
        type: String,
        default: ""
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Like'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Comment'
        }
    ]
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;