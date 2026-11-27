const pool = require("../database");

async function getAllPembelian(UserId) {
    const [rows] = await pool.query("SELECT * FROM pembelian WHERE UserId = ?", [UserId]);
    return rows;
}

async function createPembelian(UserId, TanggalPembelian) {
    const [result] = await pool.query("INSERT INTO pembelian (UserId, TanggalPembelian) VALUES (?, ?)", [UserId, TanggalPembelian]);
    return result;
}

async function getPembelianById(IdPembelian) {
    const [result] = await pool.query("SELECT * FROM pembelian WHERE IdPembelian = ?", [IdPembelian]);
    return result[0];
}

module.exports = {getAllPembelian, createPembelian, getPembelianById};