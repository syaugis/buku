const { default: mongoose } = require("mongoose");

const BookSchema = mongoose.Schema({
    gambar:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/130/130304.png"
    },
    judul:{
        type:String,
        required:true
    },
    pengarang:{
        type:String,
        required:true
    },
    penerbit:{
        type:String,
        required:true
    },
    jumhal:{
        type:Number,
        required:true
    },
    tahun:Number,
    isbn:String,
    bahasa:Number, // inggirs, indonesia, lainya
    kategori:{
        type: Number,
        required:true //fiksi, non fiksi, harem
    }, 
    terakhir_dibaca:{
        type:Date,
        required:true
    },
    hal_terakhir_dibaca:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default: new Date()
    }
});

BookSchema.index({judul:'text'})

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;