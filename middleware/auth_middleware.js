const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

function autentikasiToken(req, res, next) {
    const autHeader = req.headers.authorization;

    const token = autHeader && autHeader.split(' ')[1];
    //format header biasanya: "Bearer <TOKEN>". pisahkan berdasarkan spasi (' ')
        //authHeader.split(' ')[0] -> "Bearer"
        //authHeader.split(' ')[1] -> "<TOKEN>"
    if (!token) return res.status(401).json({message: "Akses ditolak! Login terlebih dahulu"});

    //verifikasi token
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: "Token tidak valid atau kedaluwarsa!"});
    
        req.user = user;

        next();
    })
}

module.exports = {autentikasiToken};