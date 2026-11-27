const detailModel = require("../models/detail_pembelian_model");
const pembelianModel = require("../models/pembelian_model");
const barangModel = require("../models/barang_model");

const getDetail = async (req, res) => {
    try{
        const {IdPembelian} = req.params;
        const pembelian = await pembelianModel.getPembelianById(IdPembelian);
        if(!pembelian) return res.status(404).json({message: "Data pembelian tidak ditemukan!"});

        if(pembelian.UserId !== req.user.id) return res.status(403).json({message: "Akses ditolak! Anda tidak bisa mengakses data pembelian milik orang lain"})
        const dataDetail = await detailModel.getDetailByIdPembelian(IdPembelian);
        res.status(200).json({
            message: "Berhasil mengambil data pembelian",
            data: dataDetail
        });

    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal mengambil data pembelian, terjadi kesalahan pada server!"});
    }
}

const addDetail = async (req, res) => {
    try{
        const {IdPembelian, IdBarang, JumlahBarang} = req.body;
        
        if(!IdPembelian || !IdBarang || !JumlahBarang || JumlahBarang <= 0) return res.status(400).json({message: "Seluruh detail pembelian wajib diisi!"});

        const pembelian = await pembelianModel.getPembelianById(IdPembelian);
        if(!pembelian) return res.status(404).json({message: "Data pembelian tidak ditemukan!"});

        if(pembelian.UserId !== req.user.id) return res.status(403).json({message: "Akses ditolak! Anda tidak bisa mengakses data pembelian milik orang lain!"})

        const barang = await barangModel.getBarangById(IdBarang);
        if (!barang) return res.status(404).json({message: "Barang tidak ditemukan!"})
        if (barang.StokBarang < JumlahBarang) return res.status(400).json({message: "Stok barang tidak cukup!"});
        
        const JumlahHarga = barang.HargaBarang * JumlahBarang;

        await detailModel.createDetail(IdPembelian, IdBarang, JumlahBarang, JumlahHarga);
        await detailModel.minusStok(IdBarang, JumlahBarang);
        res.status(201).json({message: "Detail pembelian berhasil terbuat!"});

    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal membuat detail pembelian, terjadi kesalahan pada server!"});
    }
}

module.exports = {getDetail, addDetail};