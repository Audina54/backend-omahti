const pool = require("../database");

async function getDetailByIdPembelian(IdPembelian) {
    const [result] = await pool.query(`SELECT
                                        detail_pembelian.*,
                                        barang.NamaBarang,
                                        barang.HargaBarang
                                       FROM detail_pembelian
                                       INNER JOIN barang ON detail_pembelian.IdBarang = barang.IdBarang
                                       WHERE detail_pembelian.IdPembelian = ?`, [IdPembelian]);
    return result;
}

async function createDetail(IdPembelian, IdBarang, JumlahBarang, JumlahHarga) {
    const [result] = await pool.query("INSERT INTO detail_pembelian (IdPembelian, IdBarang, JumlahBarang, JumlahHarga) VALUES (?, ?, ?, ?)", [IdPembelian, IdBarang, JumlahBarang, JumlahHarga]);
    return result;
}

async function minusStok(IdBarang, JumlahBarang) {
    const [result] = await pool.query("UPDATE barang SET StokBarang = StokBarang - ? WHERE IdBarang = ?", [JumlahBarang, IdBarang]);
    return result;
}

async function getTotalHargaByPembelian(IdPembelian) {
    const [result] = await pool.query("SELECT SUM(JumlahHarga) AS total FROM detail_pembelian WHERE IdPembelian = ?", [IdPembelian]);
    return result[0].total || 0;
}

module.exports = {getDetailByIdPembelian, createDetail, minusStok, getTotalHargaByPembelian};