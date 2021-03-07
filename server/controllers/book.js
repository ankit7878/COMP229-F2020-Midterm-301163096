let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let Book = require('../models/book');

module.exports.displayBookList = (req, res, next) => {
    Book.find((err, bookList) => {
        if(err)
        {
            console.log(err);
            return console.error(err);
        }
        else
        {
            res.render('book/list', { title: 'Books', BookList: bookList });      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('book/add', {title: 'Add Book'})          
}

module.exports.processAddPage = (req, res, next) => {
    let newBook = Book({
        "name": req.body.book_name,
        "author": req.body.book_author,
        "published": req.body.book_published,
        "description": req.body.book_description,
        "price": req.body.book_price
    });

    Book.create(newBook, (err, Book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let bookId = req.params.id;
    
    Book.findById(bookId).select('-__v -_id')
    .then(book => {
        if(!book) {
            res.redirect('/book-list');
        }
        res.render('book/edit', { title: 'Books', book: book, _id: bookId });
    }).catch(err => {
        res.redirect('/book-list');
    });      
}

module.exports.processEditPage = (req, res, next) => {
    let bookId = req.params.id;
    let updatedBook = {
        "name": req.body.book_name,
        "author": req.body.book_author,
        "published": req.body.book_published,
        "description": req.body.book_description,
        "price": req.body.book_price
    };

    Book.findByIdAndUpdate(bookId, updatedBook, (book)=> {
        res.redirect('/book-list');
    });
}

module.exports.processDeletePage = (req, res, next) => {
    let bookId = req.params.id;
    
    Book.findByIdAndRemove(bookId, (book)=> {
        res.redirect('/book-list');
    });
}
