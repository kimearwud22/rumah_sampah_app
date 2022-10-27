const Questions = require('../models/Questions');
module.exports = {
    getAllQuestion: async (req, res) => {
        try {
            const allQuestion = await Questions.find();
            res.json(allQuestion);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getQuestionById: async (req, res) => {
        try {
            const question = await Questions.findById(req.params.id);
            res.json(question);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    addQuestion: async (req, res) => {
        const data = new Questions({
            nama: req.body.nama,
            tlpn: req.body.tlpn,
            date: req.body.date,
            alamat: req.body.alamat,
            sampah: req.body.sampah,
            jsampah: req.body.jsampah,
            pesan: req.body.pesan
        })
        try {
            const result = await data.save()
            res.json(result)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },
    update: async (req, res) => {
        const filter = { kode: req.params.id }
        const updateData = {
            nama: req.body.nama,
            tlpn: req.body.tlpn,
            date: req.body.date,
            alamat: req.body.alamat,
            sampah: req.body.sampah,
            jsampah: req.body.jsampah
        }
        try {
            const result = await Questions.findOneAndUpdate(filter, updateData)
            res.json(result)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },
    delete: async (req, res) => {
        const filter = { _id: req.params.id }

        try {
            await Questions.deleteOne(filter)
            res.send("data telah terhapus")
        } catch (error) {
            res.status(409).json({ message: error.message })

        }
    },
    
}