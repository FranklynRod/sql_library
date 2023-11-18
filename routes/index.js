var express = require('express');
var router = express.Router();
var Book = require('../models').Book;

/* GET home page. */
function asyncHandler(cb){
  return async(req,res,next) =>{
    try{
      await cb(req,res, next);
    }catch(error){
      next(error);
  }}
}
// get / - Home route should redirect to the /books route
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
  // res.render('index', { title: 'Express' });
}));



// get /books - Shows the full list of books
// get /books/new - Shows the create new book form
// post /books/new - Posts a new book to the database
// get /books/:id - Shows book detail form
// post /books/:id - Updates book info in the database
// post /books/:id/delete - 



module.exports = router;
