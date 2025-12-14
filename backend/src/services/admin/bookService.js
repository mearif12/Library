const Book = require('../../models/Book');

const postBook = async(bookData) => {
    const newBook = new Book(bookData);
    await newBook.save();
    return newBook;
};

const fetchAllBooks = async () => {
    return await Book.find();
};

const fetchBookById = async (id) => {
    return await Book.findById(id);
};

const removeBook = async (id) => {
    return await Book.findByIdAndDelete(id);
};

const modifyBook = async (id,bookData) => {
    return await Book.findByIdAndUpdate(id,bookData,{new:true});
};

const searchBookBySem = async (sem) => {
    return await Book.find({sem:sem});
};

module.exports = { postBook,fetchAllBooks,fetchBookById,removeBook,modifyBook,searchBookBySem };