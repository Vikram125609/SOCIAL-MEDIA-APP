const mongoose = require('mongoose');
const { sendSuccess } = require('../utils/apiResponse');
const catchAsync = require('../utils/catchAsync');
const Notification = require('./../models/notificationModel');
const User = require('./../models/userModel');
const Follow = require('./../models/followModel');

const allUsers = catchAsync(async (req, res, next) => {
    let { _id } = req.user;
    // let _id = "63d76d37b5656f8db054f989";
    let data = await User.find();
    let user = await User.findById(req.user._id);
    // let user = await User.findById("63d76d37b5656f8db054f989");
    let following = await Follow.find({ user_id: _id });
    data = JSON.parse(JSON.stringify(data));
    user = JSON.parse(JSON.stringify(user));
    following = JSON.parse(JSON.stringify(following));
    // O(M x N) Time Complexity is Used Here Will Still Try To Reduce
    for (let i = 0; i < following.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (following[i].follow_id == data[j]._id) {
                data[j].isFollowed = true;
            }
        }
    }
    sendSuccess(res, 200, 'All User', data);
});

const notify = catchAsync(async (req, res, next) => {
    const { viewer, viewed } = req.body;

    if (viewed === viewer) {
        return sendSuccess(res, 201, 'You Are Watching Your Self Profile Only', {})
    }

    const checkAlreadyExist = await Notification.exists({ viewer_id: viewer, viewed_id: viewed })

    if (checkAlreadyExist) {
        await Notification.findOneAndUpdate({ viewer_id: viewer, viewed_id: viewed }, { seen: false });
        const profileViewCount = await Notification.find({ $and: [{ viewed_id: viewed }, { seen: false }] })
        const finalResponse = {
            profileViewCount: profileViewCount.length
        }
        return sendSuccess(res, 200, 'Seen Value Updated', finalResponse);
    }

    const notification = new Notification({
        viewer_id: mongoose.Types.ObjectId(viewer),
        viewed_id: mongoose.Types.ObjectId(viewed)
    });

    await notification.save();

    const profileViewCount = await Notification.find({ $and: [{ viewed_id: viewed }, { seen: false }] })

    const finalResponse = {
        notification: notification,
        profileViewCount: profileViewCount.length
    }

    return sendSuccess(res, 200, 'User Notified', finalResponse)
});

const notifications = catchAsync(async (req, res, next) => {
    const viewed_id = req.user._id;

    const notification = await Notification.find({ viewed_id: viewed_id }).populate('viewer_id', 'first_name last_name image');

    const finalResponse = {
        profileView: notification,
    }

    await Notification.updateMany({ viewed_id: viewed_id }, { seen: true });

    return sendSuccess(res, 200, 'All Profile Views', finalResponse)
})

const profileViewCount = catchAsync(async (req, res, next) => {
    const viewed_id = req.user._id;

    const profileViewCount = await Notification.find({ $and: [{ viewed_id: viewed_id }, { seen: false }] })

    const finalResponse = {
        profileViewCount: profileViewCount.length
    }

    return sendSuccess(res, 200, 'User Notified', finalResponse)
});
module.exports = { allUsers, notify, notifications, profileViewCount };