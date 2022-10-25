const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    nama:{
        required: true,
        type: String,
    },
    tlpn:{
        required: true,
        type: String,
    },
    date:{
        required: true,
        type: String,
    },
    alamat:{
        required: true,
        type: String,
    },
    sampah:{
        required: true,
        type: String,
    },
    jsampah:{
        required: true,
        type: String,
    },
    pesan:{
        required: true,
        type: String,
    },
     
});

module.exports = mongoose.model('Question',questionSchema);