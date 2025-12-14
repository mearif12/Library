const Book = require('../../models/Book');

const fetchAllBooks = async () =>{
    return await Book.find();
};

const fetchBookById = async (id) => {
   return await Book.findById(id);
};

const searchBookBySem = async (sem) => {
    return await Book.find({sem:sem});
};

module.exports = { fetchAllBooks,fetchBookById,searchBookBySem };