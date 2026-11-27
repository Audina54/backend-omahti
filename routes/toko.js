const express = require("express");
const router = express.Router();
const tokoController = require("../controllers/toko_controller");
const {autentikasiToken} = require("../middleware/auth_middleware");

router.get("/", tokoController.getToko);
router.post("/", autentikasiToken, tokoController.addToko);
router.put("/:IdToko", autentikasiToken, tokoController.editToko);
router.delete("/:IdToko", autentikasiToken, tokoController.deleteToko);

module.exports = router;