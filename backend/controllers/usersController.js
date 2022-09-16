const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const OTP = require("../models/Otp");
const sendEmail = require("../services/MailServices");
const {
  hashedPassword,
  createToken,
  comparePassword,
} = require("../services/authServices");

// @route POST /api/register
// @access Public
// @desc Create user and return a token
module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, email, password } = req.body;
    try {
      const emailExist = await UserModel.findOne({ email });
      if (!emailExist) {
        const hashed = await hashedPassword(password);
        const user = await UserModel.create({
          name,
          email,
          password: hashed,
          admin: true,
        });
        const token = createToken({ id: user._id, name: user.name });
        return res
          .status(201)
          .json({ msg: "Your account has been created!", token });
      } else {
        // email already taken
        return res.status(400).json({
          errors: [{ msg: `${email} is already taken`, param: "email" }],
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error!");
    }
  } else {
    // validations failed
    return res.status(400).json({ errors: errors.array() });
  }
};

// @route POST /api/login
// @access Public
// @desc Login user and return a token

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        if (await comparePassword(password, user.password)) {
          const token = createToken({
            id: user._id,
            name: user.name,
            email: user.email,
          });
          if (user.admin) {
            return res.status(201).json({ token, admin: true });
          } else {
            return res.status(201).json({ token, admin: false });
          }
        } else {
          return res.status(400).json({
            errors: [{ msg: "password not matched!", param: "password" }],
          });
        }
      } else {
        return res.status(400).json({
          errors: [{ msg: `${email} is not found!`, param: "email" }],
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error!");
    }
  } else {
    //  validations failed
    return res.status(400).json({ errors: errors.array() });
  }
};
module.exports.updatedetails = async (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;
  try {
    const exist = await UserModel.findOne({ id });
    const match = await bcrypt.compare(password, exist.password);
    if (match) {
      return res
        .status(400)
        .json({ errors: [{ msg: ` Please add different password` }] });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const response = await UserModel.updateOne(
        { _id: id },
        { $set: { name, password: hashed } }
      );
      console.log(response);
      return res
        .status(200)
        .json({ message: "Your name and update  has updated successfully!" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server internal error!");
  }
};
module.exports.forget = async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpCreate = new OTP({
      email: email,
      code: otpcode,
      expirein: new Date().getTime() + 300 * 1000,
    });
    const data = await otpCreate.save();
    await sendEmail(email, otpcode);
    return res.status(200).json({ message: "Please check your email!" });
  } else {
    return res.status(500).json("something went wrong!");
  }
};

module.exports.updatePassword = async (req, res) => {
  const { email, code, password } = req.body;
  let data = await OTP.find({ email, code });
  if (data) {
    let currentTime = new Date().getDate();
    let diff = data.expirein - currentTime;
    if (diff < 0) {
      return res.status(500).json("otp expired!");
    } else {
      let user = await UserModel.findOne({ email });
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      user.password = hashed;
      user.save();
      res.status(200).json({ message: "Password is changed successfully" });
    }
  }
};
