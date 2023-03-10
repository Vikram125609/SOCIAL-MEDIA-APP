const { sendSuccess } = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");
const Follow = require('../models/followModel');
const User = require('../models/userModel');
const { default: mongoose } = require("mongoose");

const followUser = catchAsync(async (req, res, next) => {
    const follow_id = req.params.id;
    const user_id = req.user._id;
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
    const id = req.user._id;
    const data = await Follow.find({ follow_id: id }).populate('user_id', 'first_name last_name image');
    const finalResponse = data.map(user => {
        return ({
            first_name: user?.user_id?.first_name,
            last_name: user?.user_id?.last_name,
            image: user?.user_id?.image
        })
    })
    return sendSuccess(res, 200, "all followers", finalResponse);
});

const me = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const data = await User.findById(id);
    const finalResponse = JSON.parse(JSON.stringify(data));
    return sendSuccess(res, 200, 'userdetail', finalResponse)
});

const profile = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    console.log("here will be the follower data sortly");
    const followers = await Follow.aggregate([
        {
            $match: { "follow_id": mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                "localField": "user_id",
                "foreignField": "_id",
                "from": "users",
                "as": "followers"
            }
        },
        {
            $unwind: "$followers"
        },
        {
            $project: {
                "_id": "$followers._id",
                "first_name": "$followers.first_name",
                "last_name": "$followers.last_name",
                "image": "$followers.image",
                "block_user": "$followers.block_user",
                "follow_user": "$followers.follow_user"
            }
        }
    ])
    const finalResponse = {
        followers: followers
    }
    return sendSuccess(res, 200, 'userdetail', finalResponse)
})
module.exports = { followUser, allFollower, profile , me};