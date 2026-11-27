const express = require("express");
const router = express.Router();
const pembayaranController = require("../controllers/pembayaran_controller");
const {autentikasiToken} = require("../middleware/auth_middleware");

router.get("/", autentikasiToken, pembayaranController.getPembayaran);
router.post("/", autentikasiToken, pembayaranController.addPembayaran);

module.exports = router;