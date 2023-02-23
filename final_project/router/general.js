const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]);
 });

//Utility function used to create a list of books by Author.
const findAuthor = async author => {
    try{
        if(author){
            const newAuthorArray = []
            Object.values(books).map(book => {
                if(book.author === author) {
                    newAuthorArray.push(book)
                }
            })
            return Promise.resolve(newAuthorArray);
        } else{
            return Promise.reject(new Error('Could not retrieve Author Promise.'));
        }
    } catch (error){
        console.log(error);
    }
}
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    //data stores the value of the findAuthor() function, when it's called.
    const data = findAuthor(author);
    res.send(books[author]);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
