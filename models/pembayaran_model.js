const pool = require("../database");

async function getAllPembayaranByUser(UserId) {
    const [rows] = await pool.query(`SELECT
                                        pembayaran.*,
                                        pembelian.TanggalPembelian
                                     FROM pembayaran
                                     INNER JOIN pembelian ON pembayaran.IdPembelian = pembelian.IdPembelian
                                     WHERE pembelian.UserId = ?`, [UserId]);
    return rows;
}

async function createPembayaran(IdPembelian, MetodePembayaran, JumlahHarga) {
    const [result] = await pool.query("INSERT INTO pembayaran (IdPembelian, MetodePembayaran, JumlahHarga) VALUES (?, ?, ?)", [IdPembelian, MetodePembayaran, JumlahHarga]);
    return result;
}

async function getPembayaranByPembelian(IdPembelian) {
    const [result] = await pool.query("SELECT * FROM pembayaran WHERE IdPembelian = ?", [IdPembelian]);
    return result[0];
}

module.exports = {getAllPembayaranByUser, createPembayaran, getPembayaranByPembelian};