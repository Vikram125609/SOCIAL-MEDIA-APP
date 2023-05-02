const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
    viewed_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    viewer_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    seen: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;