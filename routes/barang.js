const express = require("express");
const router = express.Router();
const barangController = require("../controllers/barang_controller");
const {autentikasiToken} = require("../middleware/auth_middleware");

router.get("/", barangController.getBarang);
router.post("/", autentikasiToken, barangController.addBarang);
router.put("/:IdBarang", autentikasiToken, barangController.editBarang);
router.delete("/:IdBarang", autentikasiToken, barangController.deleteBarang);

module.exports = router;