const express = require("express");
const router = express.Router();
const detail_pembelianController = require("../controllers/detail_pembelian_controller");
const {autentikasiToken} = require("../middleware/auth_middleware");

router.get("/:IdPembelian", autentikasiToken, detail_pembelianController.getDetail);
router.post("/", autentikasiToken, detail_pembelianController.addDetail);

module.exports = router;