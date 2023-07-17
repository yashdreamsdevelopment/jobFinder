const express = require("express");
const router = express.Router();

const { register, login, verifyUserMail } = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:id", verifyUserMail);

module.exports = router;
