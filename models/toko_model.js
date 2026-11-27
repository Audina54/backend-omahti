const pool = require("../database");

async function getAllToko() {
    const [rows] = await pool.query("SELECT * FROM toko");
    return rows;
}

async function createToko(UserId, NamaToko, AlamatToko) {
    const [result] = await pool.query("INSERT INTO toko (UserId, NamaToko, AlamatToko) VALUES (?, ?, ?)", [UserId, NamaToko, AlamatToko]);
    return result;
}

async function updateToko(IdToko, NamaToko, AlamatToko) {
    const [result] = await pool.query("UPDATE toko SET NamaToko = ?, AlamatToko = ? WHERE IdToko = ?", [NamaToko, AlamatToko, IdToko]);
    return result;
}

async function deleteToko(IdToko) {
    const [result] = await pool.query("DELETE FROM toko WHERE IdToko = ?", [IdToko]);
    return result;
}

async function getTokoById(IdToko) {
    const [result] = await pool.query("SELECT * FROM toko WHERE IdToko = ?", [IdToko]);
    return result[0];
}

module.exports = {getAllToko, createToko, updateToko, deleteToko, getTokoById};