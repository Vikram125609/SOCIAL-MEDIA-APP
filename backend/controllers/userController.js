const { sendSuccess } = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");
const Follow = require('../models/followModel');
const User = require('../models/userModel');
const { default: mongoose } = require("mongoose");

const followUser = catchAsync(async (req, res, next) => {
    const follow_id = req.params.id;
    const user_id = "63d794e12b8b2107697a31ab";
    const data = new Follow({
        user_id: user_id,
        follow_id: follow_id
    })
    await data.save();
    const user = await User.findByIdAndUpdate(user_id, {
        $push: {
            "follow_user": follow_id
        }
    }, { new: true }
    );
    console.log(user)
    return sendSuccess(res, 200, 'follow user', user)
});

const allFollower = catchAsync(async (req, res, next) => {
    const id = "63d76d37b5656f8db054f989";
    const data = await Follow.find({ follow_id: id }).populate('user_id', 'first_name last_name image');
    const finalResponse = data.map(user => {
        return ({
            first_name: user?.user_id?.first_name,
            last_name: user?.user_id?.last_name,
            image: user?.user_id?.image
        })
    })
    return sendSuccess(res, 200, "all followers", finalResponse);
})
module.exports = { followUser, allFollower };