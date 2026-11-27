const mysql = require("mysql2/promise");

require("dotenv").config();


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, 
    idleTimeout: 60000, 
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ssl: process.env.DB_PORT == 4000 ? { 
        minVersion: 'TLSv1.2', 
        rejectUnauthorized: false 
    } : undefined
});


pool.getConnection()
    .then((connection) => {
        console.log("Database berhasil terhubung");
        connection.release();
    })
    .catch((error) => {
        console.error(error);
    });

module.exports = pool;