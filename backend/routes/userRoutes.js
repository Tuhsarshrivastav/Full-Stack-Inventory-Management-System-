const express = require("express");
const {
  registerValidations,
  loginValidations,
} = require("../validations/userValidations");
const {
  register,
  login,
  updatedetails,
  forget,
  updatePassword,
} = require("../controllers/usersController");
const router = express.Router();
router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);
router.post("/update/:id", updatedetails);
router.post("/forget", forget);
router.post("/update", updatePassword);

module.exports = router;
