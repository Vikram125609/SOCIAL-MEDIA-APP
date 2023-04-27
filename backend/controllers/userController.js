const { sendSuccess } = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");
const Follow = require('../models/followModel');
const User = require('../models/userModel');
const { default: mongoose, mongo } = require("mongoose");
const Post = require("../models/postModel");
const { uploadImage } = require('../utils/uploadImage');
const path = require('path');
const Like = require("../models/likeModel");

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
    // yaha par you have to select the id from the param becoz consider the case 
    // when user wants to see other users profile
    const { id } = req.params;
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
    const followingId = await User.findById(id).select('follow_user');
    const following = await User.find({ _id: { $in: followingId.follow_user } }).select(' _id first_name last_name image block_user follow_user');

    const user = await User.findById(id);

    const followAndfollower = await Follow.find({ $or: [{ "follow_id": id }, { "user_id": id }] });

    let friendsIds = [];

    for (let i = 0; i < followAndfollower.length - 1; i++) {
        let user_id = followAndfollower[i].user_id.toString();
        let follow_id = followAndfollower[i].follow_id.toString();
        for (let j = i + 1; j < followAndfollower.length; j++) {
            if (user_id == followAndfollower[j].follow_id.toString() && follow_id == followAndfollower[j].user_id.toString()) {
                if (user_id == id) {
                    friendsIds.push(follow_id);
                }
                else {
                    friendsIds.push(user_id);
                }
            }
        }
    }

    const friends = await User.find({ _id: { $in: friendsIds } }).select('_id first_name last_name image block_user follow_user');

    const finalResponse = {
        followers: followers,
        following: following,
        friends: friends,
        user: user
    }

    return sendSuccess(res, 200, 'userdetail', finalResponse)
});

const friends = catchAsync(async (req, res, next) => {
    const { _id } = req.user;
    const followAndfollower = await Follow.find({ $or: [{ "follow_id": _id }, { "user_id": _id }] });
    let friendsIds = [];

    for (let i = 0; i < followAndfollower.length - 1; i++) {
        let user_id = followAndfollower[i].user_id.toString();
        let follow_id = followAndfollower[i].follow_id.toString();
        for (let j = i + 1; j < followAndfollower.length; j++) {
            if (user_id == followAndfollower[j].follow_id.toString() && follow_id == followAndfollower[j].user_id.toString()) {
                if (user_id == _id) {
                    friendsIds.push(follow_id);
                }
                else {
                    friendsIds.push(user_id);
                }
            }
        }
    }
    const friends = await User.find({ _id: { $in: friendsIds } }).select('_id first_name last_name image block_user follow_user');
    const finalResponse = {
        friends: friends,
    }
    return sendSuccess(res, 200, 'userdetail', finalResponse);

});

const createPost = catchAsync(async (req, res, next) => {
    const { discription } = req.body;
    const imagePath = path.join(__dirname, `../uploaded-images/image-${req.files[0].originalname}`)
    const data = await uploadImage(imagePath);

    const post = new Post({
        user_id: req.user._id,
        image: data.url,
        description: discription
    })

    await post.save();

    const finalResponse = {
        post: post
    }
    return sendSuccess(res, 200, 'Image Uploaded', finalResponse)
});

const getAllPost = catchAsync(async (req, res, next) => {

    const post = await Post.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'likes',
                localField: 'likes',
                foreignField: '_id',
                as: 'likes'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user_id'
            }
        },
        {
            $project: {
                _id: 1,
                image: 1,
                likes: 1,
                description: 1,
                comments: 1,
                createdAt: 1,
                user_id: { $arrayElemAt: ['$user_id', 0] }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'likes.user_id',
                foreignField: '_id',
                as: 'like_user_id'
            }
        },
        {
            $project: {
                _id: 1,
                image: 1,
                description: 1,
                comments: 1,
                user_id: 1,
                createdAt: 1,
                likes: {
                    $map: {
                        input: '$likes',
                        as: 'i',
                        in: {
                            $mergeObjects: [
                                '$$i',
                                {
                                    $first: {
                                        $filter: {
                                            input: '$like_user_id',
                                            cond: {
                                                $eq: [
                                                    '$$this._id', '$$i.user_id'
                                                ]
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }
    ])

    const finalResponse = {
        post: post
    }
    return sendSuccess(res, 200, 'All Post', finalResponse);

});

const userPost = catchAsync(async (req, res, next) => {
    const { user_id } = req.query;
    const post = await Post.find({ user_id: user_id }).populate('user_id', 'first_name last_name image');
    const finalResponse = {
        post: post
    }
    console.log(finalResponse)
    return sendSuccess(res, 200, 'My Post', finalResponse);
});

const likePost = catchAsync(async (req, res, next) => {

    const user_id = req.user._id;

    const { post_id } = req.params;

    const { type } = req.body;

    const like = new Like({
        user_id: user_id,
        type: type,
        post_id: post_id
    })

    const post = await Post.findByIdAndUpdate(
        { _id: post_id },
        { $push: { likes: like._id } },
        { new: true, runValidators: true }
    )

    await like.save();

    const finalResponse = {
        like: like,
        post: post
    }
    return sendSuccess(res, 200, 'Liked Successfully', finalResponse);

});

const commentPost = catchAsync(async (req, res, next) => {
    const { post_id } = req.params;
    console.log(post_id);
    return sendSuccess(res, 200, 'Commented Successfully', post_id);
})
module.exports = { followUser, allFollower, profile, me, friends, createPost, getAllPost, userPost, likePost, commentPost };