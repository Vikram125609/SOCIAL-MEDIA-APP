const mongoose = require('mongoose');
const { sendSuccess } = require('../utils/apiResponse');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const Follow = require('./../models/followModel');

const allUsers = catchAsync(async (req, res, next) => {
    let { _id } = req.user;
    let data = await User.find();
    let user = await User.findById(req.user._id);
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

module.exports = { allUsers };