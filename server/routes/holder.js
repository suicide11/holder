var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn, sendVerificationMail, verifyMail } = require("../controllers/auth");
const {addHolder, getHolder} = require("../controllers/holder")

router.post(
  "/add", 
  isSignedIn,
  [
    check("body", "Body is required").isLength({min:1}),
    check("title", "Title is required").isLength({ min: 1 }),
    check("encrypt","Boolean value of encrypt required").isBoolean()
  ],
  addHolder
);

router.get(
  "/",
  isSignedIn,
  getHolder
)


module.exports = router;
