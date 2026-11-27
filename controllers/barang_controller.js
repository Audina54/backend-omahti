const barangModel = require("../models/barang_model");
const tokoModel = require("../models/toko_model");

const getBarang = async (req, res) => {
    try{
        const dataBarang = await barangModel.getAllBarang();
        res.status(200).json({
            message: "Berhasil mengambil data barang",
            data: dataBarang
        });

    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal mengambil data barang, terjadi kesalahan pada server!"});
    }
}

const addBarang = async (req, res) => {
    try{
        const {IdToko, IdKategori, NamaBarang, HargaBarang, DeskripsiBarang, StokBarang} = req.body;
        if(!IdToko || !IdKategori || !NamaBarang || !HargaBarang || !DeskripsiBarang || !StokBarang) return res.status(400).json({message: "Seluruh detail barang wajib diisi!"});

        const toko = await tokoModel.getTokoById(IdToko);
        if(!toko) return res.status(404).json({message: "Toko tidak ditemukan!"});
        
        if (toko.UserId !== req.user.id) return res.status(403).json({message: "Akses ditolak! Anda tidak bisa mengelola data barang milik orang lain!"});
                
        await barangModel.createBarang(IdToko, IdKategori, NamaBarang, HargaBarang, DeskripsiBarang, StokBarang);
        res.status(201).json({message: "Data barang berhasil ditambahkan!"});

    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal menambahkan data barang, terjadi kesalahan pada server!"});
    }
}

const editBarang = async (req, res) => {
    try{
        const {IdBarang} = req.params;
        const {IdKategori, NamaBarang, HargaBarang, DeskripsiBarang, StokBarang} = req.body;

        if(!IdKategori || !NamaBarang || !HargaBarang || !DeskripsiBarang || StokBarang === null || StokBarang === undefined) return res.status(400).json({message: "Seluruh detail barang wajib diisi!"});
        
        const barang = await barangModel.getBarangById(IdBarang);
        if(!barang) return res.status(404).json({message: "Data barang tidak ditemukan!"});

        const toko = await tokoModel.getTokoById(barang.IdToko);
        if (!toko) return res.status(404).json({message: "Toko tidak ditemukan!"});

        if (toko.UserId !== req.user.id) return res.status(403).json({message: "Akses ditolak! Anda tidak bisa mengelola data barang milik orang lain"});
        await barangModel.updateBarang(IdBarang, IdKategori, NamaBarang, HargaBarang, DeskripsiBarang, StokBarang);

        res.status(200).json({message: "Data barang berhasil terupdate!"});
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal mengedit data barang, terjadi kesalahan pada server!"})
    }
}

const deleteBarang = async (req, res) => {
    try{
        const {IdBarang} = req.params;

        const barang = await barangModel.getBarangById(IdBarang);
        if(!barang) return res.status(404).json({message: "Data barang tidak ditemukan!"});

        const toko = await tokoModel.getTokoById(barang.IdToko);
        if (!toko) return res.status(404).json({message: "Toko tidak ditemukan!"});
        
        if (toko.UserId !== req.user.id) return res.status(403).json({message: "Akses ditolak! Anda tidak bisa mengelola data barang milik orang lain!"});
        await barangModel.deleteBarang(IdBarang);

        res.status(200).json({message: "Data barang berhasil dihapus!"});
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal menghapus data barang, terjadi kesalahan pada server!"})
    }
}

module.exports = {getBarang, addBarang, editBarang, deleteBarang};