USE db_onlineshop;

DROP TABLE IF EXISTS `pembayaran`;
DROP TABLE IF EXISTS `detail_pembelian`;
DROP TABLE IF EXISTS `pembelian`;
DROP TABLE IF EXISTS `barang`;
DROP TABLE IF EXISTS `toko`;
DROP TABLE IF EXISTS `kategori`;
DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `NomorHandphone` varchar(20) NOT NULL,
  `Alamat` text NOT NULL,
  `Role` enum('pembeli','penjual') NOT NULL DEFAULT 'pembeli',
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `kategori` (
  `IdKategori` int(11) NOT NULL AUTO_INCREMENT,
  `NamaKategori` varchar(50) NOT NULL,
  PRIMARY KEY (`IdKategori`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `toko` (
  `IdToko` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `NamaToko` varchar(100) NOT NULL,
  `AlamatToko` text NOT NULL,
  PRIMARY KEY (`IdToko`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `toko_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `barang` (
  `IdBarang` int(11) NOT NULL AUTO_INCREMENT,
  `IdToko` int(11) NOT NULL,
  `IdKategori` int(11) NOT NULL,
  `NamaBarang` varchar(255) NOT NULL,
  `HargaBarang` int(11) NOT NULL,
  `DeskripsiBarang` text NOT NULL,
  `StokBarang` int(11) NOT NULL,
  PRIMARY KEY (`IdBarang`),
  KEY `IdToko` (`IdToko`),
  KEY `IdKategori` (`IdKategori`),
  CONSTRAINT `barang_ibfk_1` FOREIGN KEY (`IdToko`) REFERENCES `toko` (`IdToko`),
  CONSTRAINT `barang_ibfk_2` FOREIGN KEY (`IdKategori`) REFERENCES `kategori` (`IdKategori`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `pembelian` (
  `IdPembelian` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `TanggalPembelian` date NOT NULL,
  PRIMARY KEY (`IdPembelian`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `pembelian_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `detail_pembelian` (
  `IdPembelian` int(11) NOT NULL,
  `IdBarang` int(11) NOT NULL,
  `JumlahBarang` int(11) NOT NULL,
  `JumlahHarga` int(11) NOT NULL,
  PRIMARY KEY (`IdPembelian`,`IdBarang`),
  KEY `IdBarang` (`IdBarang`),
  CONSTRAINT `detail_pembelian_ibfk_1` FOREIGN KEY (`IdPembelian`) REFERENCES `pembelian` (`IdPembelian`),
  CONSTRAINT `detail_pembelian_ibfk_2` FOREIGN KEY (`IdBarang`) REFERENCES `barang` (`IdBarang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `pembayaran` (
  `IdPembayaran` int(11) NOT NULL AUTO_INCREMENT,
  `IdPembelian` int(11) NOT NULL,
  `MetodePembayaran` varchar(100) NOT NULL,
  `JumlahHarga` int(11) NOT NULL,
  PRIMARY KEY (`IdPembayaran`),
  KEY `IdPembelian` (`IdPembelian`),
  CONSTRAINT `pembayaran_ibfk_1` FOREIGN KEY (`IdPembelian`) REFERENCES `pembelian` (`IdPembelian`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;