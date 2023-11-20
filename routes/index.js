var express = require('express');
var router = express.Router();
var Book = require('../models').Book;


function asyncHandler(cb){
  return async(req,res,next) =>{
    try{
      await cb(req,res, next);
    }catch(error){
      next(error);
  }}
}

// Home redirects to Books
router.get('/', asyncHandler(async (req, res) => {
    res.redirect("/books")
}));

//GET all books
router.get('/books', asyncHandler(async (req, res) => {
  const books = await Book.findAll();
  res.render("index",{books});
}));

//GET create new book form
router.get('/books/new', (req, res) => {
  res.render("new-book",{book: {}, title: "New Book"});
});

//POST creates a new book to the database
router.post('/books/new', asyncHandler(async (req, res) => {
  try{
    const book = await Book.create(req.body);
    res.redirect("index"+ book.id);
  } catch(error){
    if(error.name === "SequelizeValidationError") { 
      const book = await Book.build(req.body);
      res.render("new-book", {book, errors: error.errors, title: "New Book" })
    } else {
      throw error;
    } 
  }
}));

//GET edit book detail form
router.get('/books/:id', asyncHandler(async( req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book){
    res.render("update-book",{book, title: book.title})
  } else{
    res.sendStatus(404);
  }
}));

// POST updates book info in the database
router.post('/books/:id', asyncHandler(async( req, res) => {
  try{
    const book = await Book.findByPk(req.params.id);
    await book.update(req.body)
    if (book){
      res.redirect("index"+ book.id)
    } else{
      res.sendStatus(404);
    }
  } catch(error){
    if(error.name === "SequelizeValidationError") { 
      const book = await Book.build(req.body);
      book.id = re.params.id;
      res.render("new-book", {book, errors: error.errors, title: "New Book" })
    } else {
      throw error;
    } 
  }
}));

// POST delete book - 
router.post('/books/:id/delete', asyncHandler(async( req, res) => {
  try{
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    if (book){
      res.redirect("index");
    } else{
      res.sendStatus(404);
    }
  }catch(error){
    if(error.name === "SequelizeValidationError") { 
      const book = await Book.build(req.body);
      book.id = re.params.id;
      res.render("update-book", {book, errors: error.errors, title: "New Book" })
    } else {
      throw error;
    } 
  }
}));


module.exports = router;
