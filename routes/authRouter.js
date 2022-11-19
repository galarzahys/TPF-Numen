var express = require("express");
var router = express.Router();
const { userValidationRules, validate } = require("../middlewares/validator");

const {
  registerUser,
  loginUser
} = require("../controllers/authControllers");


router.post("/register", userValidationRules(), validate, registerUser);

router.post("/login", userValidationRules(), validate, loginUser);


module.exports = router;
