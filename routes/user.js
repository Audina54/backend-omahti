const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const {autentikasiToken} = require("../middleware/auth_middleware");

router.post("/register", userController.addAccount);
router.post("/login", userController.loginAccount);
router.get("/profile", autentikasiToken, userController.getProfile);

module.exports = router;
