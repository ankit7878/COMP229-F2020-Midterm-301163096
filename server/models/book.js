let mongoose = require('mongoose');

// create a model class
const bookModel = mongoose.Schema({
    name: String,
    author: String,
    published: String,
    description: String,
    price: Number
});

module.exports = mongoose.model('Book', bookModel);