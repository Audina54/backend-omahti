const pembelianModel = require("../models/pembelian_model");

const getPembelian = async (req, res) => {
    try{
        const dataPembelian = await pembelianModel.getAllPembelian(req.user.id);
        res.status(200).json({
            message: "Berhasil mengambil data pembelian",
            data: dataPembelian
        });

    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal mengambil data pembelian, terjadi kesalahan pada server!"});
    }
}

const addPembelian = async (req, res) => {
    try{
        const {TanggalPembelian} = req.body;
        const UserId = req.user.id;
        if(!TanggalPembelian) return res.status(400).json({message: "Tanggal pembelian wajib diisi!"});

        const result = await pembelianModel.createPembelian(UserId, TanggalPembelian);
        res.status(201).json({message: "Data pembelian berhasil ditambahkan!", IdPembelian: result.insertId});

    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal menambahkan data pembelian, terjadi kesalahan pada server!"});
    }
}

module.exports = {getPembelian, addPembelian};