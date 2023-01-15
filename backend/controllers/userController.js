const { sendSuccess } = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");
const Follow = require('../models/followModel');
const { default: mongoose } = require("mongoose");

const followUser = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const user_id = "63c2e7131c650bfd601e000d";
    const data = await Follow.find({ follower_id: id, user_id: user_id });
    if (data.length == 0) {
        const follow = new Follow({
            user_id: user_id,
            follower_id: id
        })
        await follow.save();
    }
    else {
        await Follow.findOneAndDelete({ follower_id: id, user_id: user_id });
    }
    return sendSuccess(res, 200, "follower", data)
});

const allFollower = catchAsync(async (req, res, next) => {
    const id = "63c2bc3b41ddb4301ac0a250";
    const data = await Follow.find({ follower_id: id }).populate('user_id', 'first_name last_name image');
    const finalResponse = data.map(x => {
        return ({
            first_name: "Vikram",
            last_name: "Singh",
            image: "http://Vikram.com"
        })
    })
    return sendSuccess(res, 200, "all followers", finalResponse);
})
module.exports = { followUser, allFollower };