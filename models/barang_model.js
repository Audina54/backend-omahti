const pool = require("../database");

async function getAllBarang() {
    const [rows] = await pool.query(`SELECT 
                                        barang.*,
                                        toko.NamaToko,
                                        kategori.NamaKategori
                                     FROM barang
                                     INNER JOIN toko ON barang.IdToko = toko.IdToko
                                     INNER JOIN kategori ON barang.IdKategori = kategori.IdKategori
                                     `);
    return rows;
}

async function createBarang(IdToko, IdKategori, NamaBarang, HargaBarang, DeskripsiBarang, StokBarang) {
    const [result] = await pool.query("INSERT INTO barang (IdToko, IdKategori, NamaBarang, HargaBarang, DeskripsiBarang, StokBarang) VALUES (?, ?, ?, ?, ?, ?)", [IdToko, IdKategori, NamaBarang, HargaBarang, DeskripsiBarang, StokBarang]);
    return result;
}

async function updateBarang(IdBarang, IdKategori, NamaBarang, HargaBarang, DeskripsiBarang, StokBarang) {
    const [result] = await pool.query("UPDATE barang SET IdKategori = ?, NamaBarang = ?, HargaBarang = ?, DeskripsiBarang = ?, StokBarang = ? WHERE IdBarang = ?", [IdKategori, NamaBarang, HargaBarang, DeskripsiBarang, StokBarang, IdBarang]);
    return result;
}

async function deleteBarang(IdBarang) {
    const [result] = await pool.query("DELETE FROM barang WHERE IdBarang = ?", [IdBarang]);
    return result;
}

async function getBarangById(IdBarang) {
    const [result] = await pool.query("SELECT * FROM barang WHERE IdBarang = ?", [IdBarang]);
    return result[0];
}

module.exports = {getAllBarang, createBarang, updateBarang, deleteBarang, getBarangById};