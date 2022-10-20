const Question = require('../models/Questions')
module.exports = {
    getAllQuestion: async (req, res) => {
        try {
            const allQuestion = await Question.find();
            res.json(allQuestion);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getInventarisById: async (req, res) => {
        try {
            const question = await Question.findById(req.params.id);
            res.json(question);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    addQuestion: async (req, res) => {
        const data = new Question({
            name: req.body.nama,
            tlpn: req.body.tlpn,
            date: req.body.date,
            alamat: req.body.alamat,
            sampah: req.body.sampah,
            jsampah: req.body.jsampah
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
            const result = await Question.findOneAndUpdate(filter, updateData)
            res.json(result)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    },
    delete: async (req, res) => {
        const filter = { kode: req.params.id }

        try {
            await Question.deleteOne(filter)
            res.send("data telah terhapus")
        } catch (error) {
            res.status(409).json({ message: error.message })

        }
    },
}