const pool = require("../database");

async function getAllKategori() {
    const [rows] = await pool.query("SELECT * FROM kategori");
    return rows;
}

async function createKategori(NamaKategori) {
    const [result] = await pool.query("INSERT INTO kategori (NamaKategori) VALUES (?)", [NamaKategori]);
    return result;
}

async function updateKategori(IdKategori, NamaKategori) {
    const [result] = await pool.query("UPDATE kategori SET NamaKategori = ? WHERE IdKategori = ?", [NamaKategori, IdKategori]);
    return result;
}

async function deleteKategori(IdKategori) {
    const [result] = await pool.query("DELETE FROM kategori WHERE IdKategori = ?", [IdKategori]);
    return result;
}

module.exports = {getAllKategori, createKategori, updateKategori, deleteKategori};