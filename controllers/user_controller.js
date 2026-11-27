const userModel = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const addAccount = async (req, res) => {
    try{
        const {Username, Email, Password, NomorHandphone, Alamat} = req.body;
        if (!Username) return res.status(400).json({message: "Username wajib diisi!"});
        if (!Email) return res.status(400).json({message: "Email wajib diisi!"});
        if (!Password) return res.status(400).json({message: "Password wajib diisi!"});
        if (!NomorHandphone) return res.status(400).json({message: "NomorHandphone wajib diisi!"});
        if (!Alamat) return res.status(400).json({message: "Alamat wajib diisi!"});

        const existingUser = await userModel.checkEmail(Email);
        if(existingUser) return res.status(409).json({message: "Email sudah terdaftar!"});

        const hashedPassword = await bcrypt.hash(Password, 10);

        await userModel.createAccount(Username, Email, hashedPassword, NomorHandphone, Alamat);
        res.status(201).json({message: "Registerasi berhasil!"});
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal melakukan registerasi, terjadi kesalahan pada server!"});
    }
}

const loginAccount = async (req, res) => {
    try{
        const {Email, Password} = req.body;
        if(!Email || !Password) return res.status(400).json({message: "Email dan password wajib diisi!"});
        
        const user = await userModel.checkEmail(Email);
        if (!user) return res.status(401).json({message: "Email atau password salah!"});

        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if(!isPasswordValid) return res.status(401).json({message: "Email atau password salah!"});

        const token = jwt.sign(
            {   id: user.UserId,
                email:  user.Email,
                role: user.Role
            },
            JWT_SECRET,
            { expiresIn: "1d"}
        );

        res.status(200).json({
            message: "Login berhasil",
            token: token,
            user: {
                id: user.UserId,
                email:  user.Email,
                role: user.Role
            }
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Gagal melakukan login, terjadi kesalahan pada server!"});
    }
}

const getProfile = async (req, res) => {
    try{
        
        return res.status(200).json({
            message: "Berhasil membaca data profil",
            user: {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role
            }
        });
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Gagal membaca data profil, terjadi kesalahan pada server!"});
    
    }
}
module.exports = {addAccount, loginAccount, getProfile};