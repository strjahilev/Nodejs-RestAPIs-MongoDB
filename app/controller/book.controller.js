 const Book = require('../model/book.model.js');

// POST a Book
exports.create = (req, res) => {
    // Create a Book
    const book = new Book({
		title: req.body.title,
		author: req.body.author,
		description: req.body.description,
		published: req.body.published
    });
 
    // Save a Book into MongoDB
    book.save()
    .then(book => {
        res.send(book.toClient());
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
 
// FETCH all Books
exports.findAll = (req, res) => {
    Book.find()
    .then(books => {		
		let returnedBooks = [];
		
		for (let i = 0; i < books.length; i++) {
			returnedBooks.push(books[i].toClient());
		}
		
        res.send(returnedBooks);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
 
// FIND a Book
exports.findOne = (req, res) => {
    Book.findById(req.params.bookId)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });            
        }
        res.send(book.toClient());
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Book with id " + req.params.bookId
        });
    });
};
 
// UPDATE a Book
exports.update = (req, res) => {
    // Find Book and update it
    Book.findOneAndUpdate({ _id: req.params.bookId }, {
		title: req.body.title,
		author: req.body.author,
		description: req.body.description,
		published: req.body.published
    }, {new: true})
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });
        }
        res.send(book.toClient());
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Error updating Book with id " + req.params.bookId
        });
    });
};
 
// DELETE a Book
exports.delete = (req, res) => {
    Book.findByIdAndRemove(req.params.bookId)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });
        }
        res.send({message: "Book deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Book not found with id " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Book with id " + req.params.bookId
        });
    });
};