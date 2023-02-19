const mongoose = require('mongoose');
const { sendSuccess } = require('../utils/apiResponse');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');

const allUsers = catchAsync(async (req, res) => {
    const data = await User.find();
    console.log(data);
    sendSuccess(res, 200, 'All User', data);
});

module.exports = { allUsers };