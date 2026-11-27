const express = require("express");
const router = express.Router();
const kategoriController = require("../controllers/kategori_controller");
const {autentikasiToken} = require("../middleware/auth_middleware");

router.get("/", kategoriController.getKategori);
router.post("/", autentikasiToken, kategoriController.addKategori);
router.put("/:IdKategori", autentikasiToken, kategoriController.editKategori);
router.delete("/:IdKategori", autentikasiToken, kategoriController.deleteKategori);

module.exports = router;