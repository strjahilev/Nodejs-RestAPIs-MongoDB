module.exports = function(app) {
 
    const books = require('../controller/book.controller.js');
 
    // Create a new Book
    app.post('/api/books/create', books.create);
 
    // Retrieve all Books
    app.get('/api/books', books.findAll);
 
    // Retrieve a single Book by Id
    app.get('/api/books/:bookId', books.findOne);
	 
    // Update a Book with Id
    app.put('/api/books/:bookId', books.update);
 
    // Delete a Book with Id
    app.delete('/api/books/:bookId', books.delete);
}