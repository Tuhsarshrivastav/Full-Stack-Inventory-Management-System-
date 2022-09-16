const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  code: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  expirein: {
    required: true,
    type: Number,
  },
});

const optModel = mongoose.model("otp", otpSchema, "otp");
module.exports = optModel;
