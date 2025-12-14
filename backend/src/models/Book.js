const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
     title:{
        type: String,
        required: [true,"Title is required"]
     },
     author:{
        type: String,
        required: [true,"Author is required"]
     },
     description:{
        type: String,
        required: [true,"Description is required"],
        maxlegth: 1000
     },
     sem:{
        type: String,
        required: [true,"Year and Semester are required"]
     },
     edition:{
        type: String
     },
     imageUrl:{
        type: String,
        required: true
     },
     bookUrl:{
        type: String,
        required: true
     }
},{ timestamps:true});

const Book = mongoose.model('Book',bookSchema);

module.exports = Book;