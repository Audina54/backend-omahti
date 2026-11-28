# Backend API E-Commerce (Online Shop)

RESTful API untuk sistem e-commerce yang dibangun menggunakan **Node.js**, **Express.js**, dan database **MySQL (TiDB Cloud)**, serta di-deploy menggunakan **Railway**.

- **Base URL (Production):** `https://backend-omahti-production.up.railway.app/`
- **File Koleksi Postman:** [`API_Online_Shop_Production.postman_collection.json`](./API_Online_Shop_Production.postman_collection.json)

---

## Teknologi yang Digunakan

- **Runtime & Framework:** Node.js, Express.js
- **Database:** MySQL (TiDB Cloud)
- **Autentikasi:** JSON Web Token (JWT) & Bcrypt
- **Deployment:** Railway

---

## Dokumentasi Endpoint API (Koleksi Postman)

### 0. Cek Server

| Method | Endpoint | Deskripsi | Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | Mengecek status server API aktif | - |

#### `GET /` (Cek Server)
**Response (`200 OK`):**
```json
{
  "Message": "API E-Commerce Online Shop aktif!"
}
```

---

### 1. Penjual

| Method | Endpoint | Nama Request | Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/user/login` | Login Penjual | - |
| `POST` | `/api/toko` | Buat Toko | Bearer Token |
| `POST` | `/api/user/register` | Register Penjual | - |
| `GET` | `/api/barang` | Membaca Data Barang | - |
| `PUT` | `/api/barang/:IdBarang` | Edit Barang | Bearer Token |
| `GET` | `/api/kategori` | Membaca Data Kategori | - |
| `GET` | `/api/toko` | Membaca Data Toko | - |
| `POST` | `/api/barang` | Tambah Barang | Bearer Token |
| `PUT` | `/api/toko/:IdToko` | Edit Toko | Bearer Token |
| `PUT` | `/api/kategori/:IdKategori` | Edit Kategori | Bearer Token |
| `POST` | `/api/kategori` | Buat Kategori | Bearer Token |
| `GET` | `/api/user/profile` | Membaca Profil Penjual | Bearer Token |

#### 1.1 Login Penjual — `POST /api/user/login`
**Request Body:**
```json
{
  "Email": "budi@gmail.com",
  "Password": "password123"
}
```
**Response (`200 OK`):**
```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "budi@gmail.com",
    "role": "pembeli"
  }
}
```

#### 1.2 Buat Toko — `POST /api/toko`
**Request Body:**
```json
{
  "NamaToko": "Budi Elektronik",
  "AlamatToko": "Jakarta Selatan"
}
```
**Response (`201 Created`):**
```json
{
  "message": "Data toko berhasil ditambahkan!"
}
```

#### 1.3 Register Penjual — `POST /api/user/register`
**Request Body:**
```json
{
  "Username": "budi_penjual",
  "Email": "budi@gmail.com",
  "Password": "password123",
  "NomorHandphone": "08123456789",
  "Alamat": "Jl. Merdeka No. 10, Jakarta"
}
```
**Response (`201 Created`):**
```json
{
  "message": "Registerasi berhasil!"
}
```

#### 1.4 Membaca Data Barang — `GET /api/barang`
**Response (`200 OK`):**
```json
{
  "message": "Berhasil mengambil data barang",
  "data": [
    {
      "IdBarang": 1,
      "IdToko": 1,
      "IdKategori": 1,
      "NamaBarang": "Keyboard Mechanical RGB",
      "HargaBarang": 450000,
      "DeskripsiBarang": "Switch biru, garansi 1 tahun",
      "StokBarang": 10,
      "NamaToko": "Budi Elektronik Official",
      "NamaKategori": "Elektronik & Komputer"
    }
  ]
}
```

#### 1.5 Edit Barang — `PUT /api/barang/1`
**Request Body:**
```json
{
  "IdKategori": 1,
  "NamaBarang": "Keyboard Mechanical RGB Pro",
  "HargaBarang": 500000,
  "DeskripsiBarang": "Switch merah, garansi 1 tahun",
  "StokBarang": 15
}
```
**Response (`200 OK`):**
```json
{
  "message": "Data barang berhasil terupdate!"
}
```

#### 1.6 Membaca Data Kategori — `GET /api/kategori`
**Response (`200 OK`):**
```json
{
  "message": "Berhasil mengambil data kategori",
  "data": [
    {
      "IdKategori": 1,
      "NamaKategori": "Gadget & Aksesoris"
    }
  ]
}
```

#### 1.7 Membaca Data Toko — `GET /api/toko`
**Response (`200 OK`):**
```json
{
  "message": "Berhasil mengambil data toko",
  "data": [
    {
      "IdToko": 1,
      "UserId": 1,
      "NamaToko": "Budi Elektronik",
      "AlamatToko": "Jakarta Selatan"
    }
  ]
}
```

#### 1.8 Tambah Barang — `POST /api/barang`
**Request Body:**
```json
{
  "IdToko": 1,
  "IdKategori": 1,
  "NamaBarang": "Keyboard Mechanical RGB",
  "HargaBarang": 450000,
  "DeskripsiBarang": "Switch biru, garansi 1 tahun",
  "StokBarang": 10
}
```
**Response (`201 Created`):**
```json
{
  "message": "Data barang berhasil ditambahkan!"
}
```

#### 1.9 Edit Toko — `PUT /api/toko/1`
**Request Body:**
```json
{
  "NamaToko": "Budi Elektronik Official",
  "AlamatToko": "Jakarta Pusat"
}
```
**Response (`200 OK`):**
```json
{
  "message": "Data toko berhasil terupdate!"
}
```

#### 1.10 Edit Kategori — `PUT /api/kategori/1`
**Request Body:**
```json
{
  "NamaKategori": "Elektronik & Komputer"
}
```
**Response (`200 OK`):**
```json
{
  "message": "Data kategori berhasil terupdate!"
}
```

#### 1.11 Buat Kategori — `POST /api/kategori`
**Request Body:**
```json
{
  "NamaKategori": "Gadget & Aksesoris"
}
```
**Response (`201 Created`):**
```json
{
  "message": "Data kategori berhasil ditambahkan!"
}
```

#### 1.12 Membaca Profil Penjual — `GET /api/user/profile`
**Response (`200 OK`):**
```json
{
  "message": "Berhasil membaca data profil",
  "user": {
    "id": 1,
    "email": "budi@gmail.com",
    "role": "pembeli"
  }
}
```

---

### 2. Pembeli

| Method | Endpoint | Nama Request | Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/user/register` | Register Pembeli | - |
| `POST` | `/api/user/login` | Login Pembeli | - |
| `GET` | `/api/barang` | Membaca Data Barang | - |
| `POST` | `/api/pembelian` | Buat Pembelian | Bearer Token |
| `GET` | `/api/pembelian` | Membaca Daftar Pembelian | Bearer Token |
| `POST` | `/api/detail-pembelian` | Buat Detail-Pembelian | Bearer Token |
| `GET` | `/api/detail-pembelian/:IdPembelian` | Membaca Detail-Pembelian | Bearer Token |
| `POST` | `/api/pembayaran` | Buat Pembayaran | Bearer Token |
| `GET` | `/api/pembayaran` | Membaca Pembayaran | Bearer Token |

#### 2.1 Register Pembeli — `POST /api/user/register`
**Request Body:**
```json
{
  "Username": "ani_pembeli",
  "Email": "ani@gmail.com",
  "Password": "password123",
  "NomorHandphone": "08987654321",
  "Alamat": "Jl. Sudirman No. 25, Bandung"
}
```
**Response (`201 Created`):**
```json
{
  "message": "Registerasi berhasil!"
}
```

#### 2.2 Login Pembeli — `POST /api/user/login`
**Request Body:**
```json
{
  "Email": "ani@gmail.com",
  "Password": "password123"
}
```
**Response (`200 OK`):**
```json
{
  "message": "Login berhasil",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 30001,
    "email": "ani@gmail.com",
    "role": "pembeli"
  }
}
```

#### 2.3 Membaca Data Barang — `GET /api/barang`
**Response (`200 OK`):**
```json
{
  "message": "Berhasil mengambil data barang",
  "data": [
    {
      "IdBarang": 1,
      "IdToko": 1,
      "IdKategori": 1,
      "NamaBarang": "Keyboard Mechanical RGB Pro",
      "HargaBarang": 500000,
      "DeskripsiBarang": "Switch merah, garansi 1 tahun",
      "StokBarang": 15,
      "NamaToko": "Budi Elektronik Official",
      "NamaKategori": "Elektronik & Komputer"
    }
  ]
}
```

#### 2.4 Buat Pembelian — `POST /api/pembelian`
**Request Body:**
```json
{
  "TanggalPembelian": "2026-11-28"
}
```
**Response (`201 Created`):**
```json
{
  "message": "Data pembelian berhasil ditambahkan!",
  "IdPembelian": 1
}
```

#### 2.5 Membaca Daftar Pembelian — `GET /api/pembelian`
**Response (`200 OK`):**
```json
{
  "message": "Berhasil mengambil data pembelian",
  "data": [
    {
      "IdPembelian": 1,
      "UserId": 30001,
      "TanggalPembelian": "2026-11-28T00:00:00.000Z"
    }
  ]
}
```

#### 2.6 Buat Detail-Pembelian — `POST /api/detail-pembelian`
**Request Body:**
```json
{
  "IdPembelian": 1,
  "IdBarang": 1,
  "JumlahBarang": 2
}
```
**Response (`201 Created`):**
```json
{
  "message": "Detail pembelian berhasil terbuat!"
}
```

#### 2.7 Membaca Detail-Pembelian — `GET /api/detail-pembelian/1`
**Response (`200 OK`):**
```json
{
  "message": "Berhasil mengambil data pembelian",
  "data": [
    {
      "IdPembelian": 1,
      "IdBarang": 1,
      "JumlahBarang": 2,
      "JumlahHarga": 1000000,
      "NamaBarang": "Keyboard Mechanical RGB Pro",
      "HargaBarang": 500000
    }
  ]
}
```

#### 2.8 Buat Pembayaran — `POST /api/pembayaran`
**Request Body:**
```json
{
  "IdPembelian": 1,
  "MetodePembayaran": "Transfer Bank BCA"
}
```
**Response (`201 Created`):**
```json
{
  "message": "Pembayaran berhasil!"
}
```

#### 2.9 Membaca Pembayaran — `GET /api/pembayaran`
**Response (`200 OK`):**
```json
{
  "message": "Berhasil mengambil data pembayaran",
  "data": [
    {
      "IdPembayaran": 1,
      "IdPembelian": 1,
      "MetodePembayaran": "Transfer Bank BCA",
      "JumlahHarga": 1000000,
      "TanggalPembelian": "2026-11-28T00:00:00.000Z"
    }
  ]
}
```

---

### 3. Delete

#### 3.1 Folder `Membuat Dummy`

| Method | Endpoint | Nama Request | Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/toko` | buat toko | Bearer Token |
| `POST` | `/api/kategori` | buat kategori | Bearer Token |
| `POST` | `/api/barang` | tambah barang | Bearer Token |

##### `POST /api/toko` (`buat toko`)
**Request Body:**
```json
{
  "NamaToko": "Toko Dummy Hapus",
  "AlamatToko": "Bandung"
}
```
**Response (`201 Created`):**
```json
{
  "message": "Data toko berhasil ditambahkan!"
}
```

##### `POST /api/kategori` (`buat kategori`)
**Request Body:**
```json
{
  "NamaKategori": "Kategori Dummy Hapus"
}
```
**Response (`201 Created`):**
```json
{
  "message": "Data kategori berhasil ditambahkan!"
}
```

##### `POST /api/barang` (`tambah barang`)
**Request Body:**
```json
{
  "IdToko": 2,
  "IdKategori": 2,
  "NamaBarang": "Barang Dummy Hapus",
  "HargaBarang": 10000,
  "DeskripsiBarang": "Produk uji coba hapus",
  "StokBarang": 5
}
```
**Response (`201 Created`):**
```json
{
  "message": "Data barang berhasil ditambahkan!"
}
```

#### 3.2 Eksekusi Delete

| Method | Endpoint | Nama Request | Auth |
| :--- | :--- | :--- | :---: |
| `DELETE` | `/api/barang/:IdBarang` | Delete Barang | Bearer Token |
| `DELETE` | `/api/kategori/:IdKategori` | Delete Kategori | Bearer Token |
| `DELETE` | `/api/toko/:IdToko` | Delete Toko | Bearer Token |

##### `DELETE /api/barang/2` (Delete Barang)
**Response (`200 OK`):**
```json
{
  "message": "Data barang berhasil dihapus!"
}
```

##### `DELETE /api/kategori/2` (Delete Kategori)
**Response (`200 OK`):**
```json
{
  "message": "Data kategori berhasil dihapus"
}
```

##### `DELETE /api/toko/2` (Delete Toko)
**Response (`200 OK`):**
```json
{
  "message": "Data toko berhasil dihapus!"
}
```

---

## Instalasi & Konfigurasi `.env`

1. Install seluruh package yang dibutuhkan:
```bash
npm install
```

2. Buat file `.env` di folder utama proyek dan isi variabel berikut:
```env
PORT=3000
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=4000
JWT_SECRET=
```

## Identitas
- **Nama:** Audina Dwiyunita Putri
- **NIM:** 26/587248/PA/24748