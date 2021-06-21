const express = require("express");
const router = express.Router();
const {
  userValidation,
  userCreation,
  userData,
  resetPassword,
  resetPasswordValidator,
} = require("../Controllers/user");
const { auth } = require("../Middleware/auth");

router.post("/login", userValidation);
router.post("/register", userCreation);
router.post("/reset/:uuid", resetPasswordValidator);
router.post("/reset", resetPassword);
router.get("/me", auth, userData);

module.exports = router;
