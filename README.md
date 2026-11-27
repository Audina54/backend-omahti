# Backend API E-Commerce (Online Shop)

RESTful API untuk sistem e-commerce yang dibangun menggunakan **Node.js**, **Express.js**, dan database **MySQL (TiDB Cloud)**, serta di-deploy menggunakan **Railway**.

- **Base URL (Production):** `https://backend-omahti-production.up.railway.app/`
- **File Koleksi Postman:** [`API Online Shop - Production.postman_collection.json`](./API%20Online%20Shop%20-%20Production.postman_collection.json)

---

## Teknologi yang Digunakan

- **Runtime & Framework:** Node.js, Express.js
- **Database:** MySQL (TiDB Cloud)
- **Autentikasi:** JSON Web Token (JWT) & Bcrypt
- **Deployment:** Railway

---

## Daftar Lengkap Endpoint API

### 0. Root / Health Check

| Method | Endpoint | Deskripsi | Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | Mengecek status server API aktif | - |

#### `GET /`
**Response (`200 OK`):**
```json
{
  "Message": "API E-Commerce Online Shop aktif!"
}
```

---

### 1. Autentikasi & Profil (`User`)

| Method | Endpoint | Deskripsi | Auth |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/user/register` | Registrasi akun pengguna baru | - |
| `POST` | `/api/user/login` | Login pengguna untuk mendapatkan token JWT | - |
| `GET` | `/api/user/profile` | Membaca data profil pengguna yang sedang login | Bearer Token |

#### `POST /api/user/register`
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

#### `POST /api/user/login`
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

#### `GET /api/user/profile`
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

### 2. Master Data (`Toko`, `Kategori`, `Barang`)
> **Catatan:** Endpoint `POST`, `PUT`, dan `DELETE` memerlukan Header `Authorization: Bearer <token>`. Pengubahan dan penghapusan data `Toko` maupun `Barang` divalidasi berdasarkan kepemilikan `UserId`.

| Method | Endpoint | Deskripsi | Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/toko` | Menampilkan seluruh data toko | - |
| `POST` | `/api/toko` | Menambahkan data toko baru | Bearer Token |
| `PUT` | `/api/toko/:IdToko` | Memperbarui data toko berdasarkan ID | Bearer Token |
| `DELETE` | `/api/toko/:IdToko` | Menghapus data toko berdasarkan ID | Bearer Token |
| `GET` | `/api/kategori` | Menampilkan seluruh kategori barang | - |
| `POST` | `/api/kategori` | Menambahkan kategori barang baru | Bearer Token |
| `PUT` | `/api/kategori/:IdKategori` | Memperbarui nama kategori berdasarkan ID | Bearer Token |
| `DELETE` | `/api/kategori/:IdKategori` | Menghapus kategori berdasarkan ID | Bearer Token |
| `GET` | `/api/barang` | Menampilkan seluruh daftar barang beserta stok | - |
| `POST` | `/api/barang` | Menambahkan produk/barang baru | Bearer Token |
| `PUT` | `/api/barang/:IdBarang` | Memperbarui data produk/barang berdasarkan ID | Bearer Token |
| `DELETE` | `/api/barang/:IdBarang` | Menghapus produk/barang berdasarkan ID | Bearer Token |

#### `GET /api/toko`
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

#### `POST /api/toko`
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

#### `PUT /api/toko/:IdToko`
**Request Body (`PUT /api/toko/1`):**
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

#### `DELETE /api/toko/:IdToko`
**Response (`200 OK` — `DELETE /api/toko/30001`):**
```json
{
  "message": "Data toko berhasil dihapus!"
}
```

#### `GET /api/kategori`
**Response (`200 OK`):**
```json
{
  "message": "Berhasil mengambil data kategori",
  "data": [
    {
      "IdKategori": 1,
      "NamaKategori": "Elektronik & Komputer"
    }
  ]
}
```

#### `POST /api/kategori`
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

#### `PUT /api/kategori/:IdKategori`
**Request Body (`PUT /api/kategori/1`):**
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

#### `DELETE /api/kategori/:IdKategori`
**Response (`200 OK` — `DELETE /api/kategori/30001`):**
```json
{
  "message": "Data kategori berhasil dihapus"
}
```

#### `GET /api/barang`
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

#### `POST /api/barang`
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

#### `PUT /api/barang/:IdBarang`
**Request Body (`PUT /api/barang/1`):**
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

#### `DELETE /api/barang/:IdBarang`
**Response (`200 OK` — `DELETE /api/barang/30002`):**
```json
{
  "message": "Data barang berhasil dihapus!"
}
```

---

### 3. Transaksi (`Pembelian`, `Detail Pembelian`, `Pembayaran`)
> **Catatan:** Seluruh endpoint transaksi memerlukan Header `Authorization: Bearer <token>` dan divalidasi berdasarkan kepemilikan transaksi pengguna.

| Method | Endpoint | Deskripsi | Auth |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/pembelian` | Menampilkan riwayat pembelian milik pengguna | Bearer Token |
| `POST` | `/api/pembelian` | Membuat header transaksi pembelian baru | Bearer Token |
| `GET` | `/api/detail-pembelian/:IdPembelian` | Menampilkan rincian item barang dalam satu transaksi | Bearer Token |
| `POST` | `/api/detail-pembelian` | Menambahkan item barang ke pembelian & mengurangi stok otomatis | Bearer Token |
| `GET` | `/api/pembayaran` | Menampilkan riwayat pembayaran milik pengguna | Bearer Token |
| `POST` | `/api/pembayaran` | Mencatat pembayaran berdasarkan total harga detail pembelian | Bearer Token |

#### `GET /api/pembelian`
**Response (`200 OK`):**
```json
{
  "message": "Berhasil mengambil data pembelian",
  "data": [
    {
      "IdPembelian": 1,
      "UserId": 2,
      "TanggalPembelian": "2026-11-27"
    }
  ]
}
```

#### `POST /api/pembelian`
**Request Body:**
```json
{
  "TanggalPembelian": "2026-11-27",
  "items": [
    {
      "IdBarang": 1,
      "JumlahBarang": 2
    }
  ]
}
```

**Response (`201 Created`):**
```json
{
  "message": "Data pembelian berhasil ditambahkan!",
  "IdPembelian": 1
}
```

#### `GET /api/detail-pembelian/:IdPembelian`
**Response (`200 OK` — `GET /api/detail-pembelian/1`):**
```json
{
  "message": "Berhasil mengambil data pembelian",
  "data": [
    {
      "IdDetail": 1,
      "IdPembelian": 1,
      "IdBarang": 1,
      "JumlahBarang": 2,
      "JumlahHarga": 900000
    }
  ]
}
```

#### `POST /api/detail-pembelian`
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

#### `GET /api/pembayaran`
**Response (`200 OK`):**
```json
{
  "message": "Berhasil mengambil data pembayaran",
  "data": [
    {
      "IdPembayaran": 1,
      "IdPembelian": 1,
      "MetodePembayaran": "Transfer Bank BCA",
      "JumlahHarga": 900000
    }
  ]
}
```

#### `POST /api/pembayaran`
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