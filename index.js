const express = require("express");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000; 
app.use(express.json()); 

const userRoute = require("./routes/user");
app.use('/api/user', userRoute);

const kategoriRoute = require("./routes/kategori");
app.use('/api/kategori', kategoriRoute);

const tokoRoute = require("./routes/toko");
app.use('/api/toko', tokoRoute);

const barangRoute = require("./routes/barang");
app.use('/api/barang', barangRoute);

const pembelianRoute = require("./routes/pembelian");
app.use('/api/pembelian', pembelianRoute);

const detail_pembelianRoute = require("./routes/detail_pembelian");
app.use('/api/detail-pembelian', detail_pembelianRoute);

const pembayaranRoute = require("./routes/pembayaran");
app.use('/api/pembayaran', pembayaranRoute);

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
    console.log(`website: http://localhost:${PORT}`);
})

app.get('/', (req, res) => res.json ({Message: "API E-Commerce Online Shop aktif!"}))