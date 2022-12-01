// gambar, judul, pengarang, penerbit, jumhal, tahun terbit, isbn, bahasa, kategori, createdAt, terakhir dibaca, 
const express = require('express');
const router = express.Router();

const {getAllBook, getBookById, changeBookById, storeBook, deleteBookById} = require('./../controller/c_book')

router.get('/', getAllBook);
router.get('/:id', getBookById);
router.put('/:id', changeBookById);
router.post('/', storeBook);
router.delete('/:id', deleteBookById);

module.exports = router;