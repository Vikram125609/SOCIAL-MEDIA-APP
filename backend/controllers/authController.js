const User = require('../models/userModel');
const Credential = require('../models/credentialModel');
const catchAsync = require('../utils/catchAsync');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const signup = catchAsync(async (req, res, next) => {

    const credential = new Credential({
        phone: req.body.phone,
        email: req.body.email
    });

    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        image: req.body.image,
        user_id: credential._id,
    });

    await credential.save();
    await user.save();

    const finalResponse = {
        credential,
        user
    }

    return sendSuccess(res, 200, "Signup Successfully", finalResponse);
});
module.exports = { signup };