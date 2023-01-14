const User = require('../models/userModel');
const Credential = require('../models/credentialModel');
const signup = async (req, res) => {
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
    res.status(200).json({credential,user})
};
module.exports = { signup };