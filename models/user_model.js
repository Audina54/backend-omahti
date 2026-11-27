const pool = require("../database");

async function createAccount (Username, Email, Password, NomorHandphone, Alamat) {
    const [result] = await pool.query(
                        "INSERT INTO user (Username, Email, Password, NomorHandphone, Alamat) VALUES (?, ?, ?, ?, ?)", 
                        [Username, Email, Password, NomorHandphone, Alamat]
                    );
    return result;
}

async function checkEmail (Email) {
    const [rows] = await pool.query("SELECT * FROM user WHERE Email = ?", [Email]);
    return rows[0];
}

async function getUserById(UserId) {
    const [result] = await pool.query("SELECT * FROM user WHERE UserId = ?", [UserId]);
    return result[0];
}

module.exports = {createAccount, checkEmail, getUserById};