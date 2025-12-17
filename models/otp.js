import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{
        required: true,
        type: String
    },
    otp:{
        required: true,
        type: Number
    },
})

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;