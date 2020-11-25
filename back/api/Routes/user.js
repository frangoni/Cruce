const express = require("express");
const router = express.Router();
const {
  userValidation,
  userCreation,
  userData,
} = require("../Controllers/user");
const auth = require("../Middleware/auth");

router.post("/login", userValidation);

router.post("/register", userCreation);

router.get("/me", auth, userData);

module.exports = router;
