const pembayaranModel = require("../models/pembayaran_model");
const pembelianModel = require("../models/pembelian_model");
const detailModel = require("../models/detail_pembelian_model");

const getPembayaran = async (req, res) => {
    try{
        const dataPembayaran = await pembayaranModel.getAllPembayaranByUser(req.user.id);
        res.status(200).json({
            message: "Berhasil mengambil data pembayaran",
            data: dataPembayaran
        });

    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal mengambil data pembayaran, terjadi kesalahan pada server!"});
    }
}

const addPembayaran = async (req, res) => {
    try{
        const {IdPembelian, MetodePembayaran} = req.body;
        
        if(!IdPembelian || !MetodePembayaran) return res.status(400).json({message: "Seluruh detail pembayaran wajib diisi!"});

        const pembelian = await pembelianModel.getPembelianById(IdPembelian);
        if(!pembelian) return res.status(404).json({message: "Data pembelian tidak ditemukan!"});

        if(pembelian.UserId !== req.user.id) return res.status(403).json({message: "Akses ditolak! Anda tidak bisa mengakses data pembayaran milik orang lain"})

        const sudahBayar = await pembayaranModel.getPembayaranByPembelian(IdPembelian);
        if(sudahBayar) return res.status(400).json({message: "Transaksi ini sudah dibayar!"});

        const JumlahHarga = await detailModel.getTotalHargaByPembelian(IdPembelian);
        if( JumlahHarga <= 0) return res.status(400).json({message: "Detail pembelian masih kosong, belum ada barang yang dibeli!"});

        await pembayaranModel.createPembayaran(IdPembelian, MetodePembayaran, JumlahHarga);
        res.status(201).json({message: "Pembayaran berhasil!"});

    }
    catch(error) {
        console.error(error);
        res.status(500).json({message: "Gagal membuat pembayaran, terjadi kesalahan pada server!"});
    }
}

module.exports = {getPembayaran, addPembayaran};