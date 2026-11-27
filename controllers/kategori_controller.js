const kategoriModel = require("../models/kategori_model");


const getKategori = async (req, res) => {
    try{
        const dataKategori = await kategoriModel.getAllKategori();
        res.status(200).json({
            message: "Berhasil mengambil data kategori",
            data: dataKategori
        });

    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal mengambil data kategori, terjadi kesalahan pada server!"});
    }
}

const addKategori = async (req, res) => {
    try{
        const {NamaKategori} = req.body;
        if(!NamaKategori) return res.status(400).json({message: "Nama kategori wajib diisi!"});

        await kategoriModel.createKategori(NamaKategori);
        res.status(201).json({message: "Data kategori berhasil ditambahkan!"});

    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal menambahkan data kategori, terjadi kesalahan pada server!"});
    }
}

const editKategori = async (req, res) => {
    try{
        const {IdKategori} = req.params;
        const {NamaKategori} = req.body;
        if(!NamaKategori) return res.status(400).json({message: "Nama kategori wajib diisi!"});

        const result = await kategoriModel.updateKategori(IdKategori, NamaKategori);

        if(result.affectedRows === 0) return res.status(404).json({message: "Data kategori tidak ditemukan!"});

        res.status(200).json({message: "Data kategori berhasil terupdate!"});
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal mengedit data kategori, terjadi kesalahan pada server!"})
    }
}

const deleteKategori = async (req, res) => {
    try{
        const {IdKategori} = req.params;
        const result = await kategoriModel.deleteKategori(IdKategori);
        
        if (result.affectedRows === 0) return res.status(404).json({message: "Data kategori tidak ditemukan!"});

        res.status(200).json({message: "Data kategori berhasil dihapus"});
    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal menghapus data kategori, terjadi kesalahan pada server!"})
    }
}

module.exports = {getKategori, addKategori, editKategori, deleteKategori};