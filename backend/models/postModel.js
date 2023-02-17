const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    media: {
        
    }
});