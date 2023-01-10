const getOtp = (req, res) => {
    const finalResponse = {
        success: true,
        message: "Here is your OTP"
    }
    res.status(200).json(finalResponse);
};
const getUser = (req, res) => {
    const finalResponse = {
        success: true,
        message: "Here is your User"
    }
    res.status(200).json(finalResponse);
}
module.exports = { getOtp, getUser };