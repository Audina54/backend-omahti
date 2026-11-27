const tokoModel = require("../models/toko_model");

const getToko = async (req, res) => {
    try{
        const dataToko = await tokoModel.getAllToko();
        res.status(200).json({
            message: "Berhasil mengambil data toko",
            data: dataToko
        });

    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal mengambil data toko, terjadi kesalahan pada server!"});
    }
}

const addToko = async (req, res) => {
    try{
        const {NamaToko, AlamatToko} = req.body;
        const UserId = req.user.id;
        if(!NamaToko || !AlamatToko) return res.status(400).json({message: "Nama toko dan alamat toko wajib diisi!"});

        await tokoModel.createToko(UserId, NamaToko, AlamatToko);
        res.status(201).json({message: "Data toko berhasil ditambahkan!"});

    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal menambahkan data toko, terjadi kesalahan pada server!"});
    }
}

const editToko = async (req, res) => {
    try{
        const {IdToko} = req.params;
        const {NamaToko, AlamatToko} = req.body;

        if(!NamaToko || !AlamatToko) return res.status(400).json({message: "Nama toko dan alamat toko wajib diisi!"});

        const toko = await tokoModel.getTokoById(IdToko);
        if(!toko) return res.status(404).json({message: "Data toko tidak ditemukan!"});

        if (toko.UserId !== req.user.id) return res.status(403).json({message: "Akses ditolak! Anda tidak bisa mengelola data toko milik orang lain!"});
        await tokoModel.updateToko(IdToko, NamaToko, AlamatToko);

        res.status(200).json({message: "Data toko berhasil terupdate!"});
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal mengedit data toko, kesalahan pada server!"})
    }
}

const deleteToko = async (req, res) => {
    try{
        const {IdToko} = req.params;

        const toko = await tokoModel.getTokoById(IdToko);
        if(!toko) return res.status(404).json({message: "Data toko tidak ditemukan!"});
        if (toko.UserId !== req.user.id) return res.status(403).json({message: "Akses ditolak! Anda tidak bisa mengelola data toko milik orang lain!"});
        
        await tokoModel.deleteToko(IdToko);

        res.status(200).json({message: "Data toko berhasil dihapus!"});
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal menghapus data toko, kesalahan pada server!"})
    }
}

module.exports = {getToko, addToko, editToko, deleteToko};