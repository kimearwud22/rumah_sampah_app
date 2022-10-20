
const Inventaris = require('../models/inventarisEmbedded')


module.exports = {
    getAllInventaris: async (req, res) => {
        try {
            const allInventaris = await Inventaris.find();
            res.json(allInventaris);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getInventarisById: async (req, res) => {
        try {
            const inventaris = await Inventaris.findById(req.params.id);
            res.json(inventaris);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getInventarisKode :(req, res) => {
        const filter = {
            kode: req.params.kode
        }
        Inventaris.find(filter, (err, data) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.json(data);
            }
        }
        )
    },
    getInventarisByKode: async (req, res) => {
        const kode = req.params.kode;
        try {
            const result = await Inventaris.findOne({ "kode": kode }, { "_id": 0, "pinjam": 0 })
            res.json(result)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    addInventaris: async (req, res) => {
        const data = new Inventaris({
            kode: req.body.kode,
            nama: req.body.nama,
            merk: req.body.merk,
            jumlah: req.body.jumlah,
            foto: req.body.foto,
            keterangan: req.body.keterangan
        })
        try {
            const result = await data.save()
            res.json(result)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    getInventarisPinjam: async (req, res) => {
        const kode = req.params.kode;
        try{
            const result = await Inventaris.findOne({ "kode": kode }, { "_id": 0, "pinjam": 1 })
            res.json(result)
        }
        catch(err){
            res.status(500).json({ message: err.message })
        }
    },  
    insertPinjam: async (req, res) => {
        const kode = req.params.kode;
        try{
            await Inventaris.updateOne(
                { "kode": kode },
                {
                    $push:{
                        "pinjam": {
                            "pegawai": req.body.pegawai,
                            "tanggal": req.body.tanggal,
                            "status": req.body.status,
                    }
                }
            }
            )
            res.json({ message: "Berhasil" })
        }
        catch(err){
            res.status(500).json({ message: err.message })
        }
    },

    update: async (req, res) => {
        const filter = { kode: req.params.kode }
        const updateData = {
            kode: req.body.kode,
            nama: req.body.nama,
            merk: req.body.merk,
            jumlah: req.body.jumlah,
            foto: req.body.foto,
            keterangan: req.body.keterangan
        }
        try {
            const result = await Inventaris.findOneAndUpdate(filter, updateData)
            res.json(result)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },

    delete: async (req, res) => {
        const filter = { kode: req.params.kode }

        try {
            await Inventaris.deleteOne(filter)
            res.send("data telah terhapus")
        } catch (error) {
            res.status(409).json({ message: error.message })

        }
    },
    deletePinjam: async (req, res) => {
        const kode = req.params.kode;
        const filter = { kode: kode }
        try {
            await Inventaris.findOneAndUpdate(filter,
                {
                    $pull: {
                        pinjam: {
                            pegawai: req.body.pegawai,
                            tanggal: req.body.tanggal,
                            status: req.body.status
                        }
                    }
                })
            res.json({ message: "Peminjaman berhasil" })
        }
        catch (err) {
            res.status(500).json({ message: err.message })
        }
    },
}