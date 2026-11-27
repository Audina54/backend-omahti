const express = require("express");
const router = express.Router();
const pembelianController = require("../controllers/pembelian_controller");
const {autentikasiToken} = require("../middleware/auth_middleware");

router.get("/", autentikasiToken, pembelianController.getPembelian);
router.post("/", autentikasiToken, pembelianController.addPembelian);

module.exports = router;