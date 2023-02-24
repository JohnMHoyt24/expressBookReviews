const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req,res) => {
    try{
        //The two variables store the username & password provided by the user
        const username = req.body.username;
        const password = req.body.password;
        if(isValid(username)){
            //Check that there i
            if(users.length > 0){
                for(let user in users){
                    //Check to see if the username provided matches with any entries in the list
                    if(users[user].username === username){
                        //Cannot have duplicate users in the list
                        return res.status(404).json({message: "User already exists!"});
                    }
                }
            }
            //If not a duplicate, add new user to the list with username & password
            users.push({username: username, password: password});
            return res.status(200).json({message: "User has been registered."});
        } else{
            //User provided an invalid username
            return res.status(400).json({message: "Username is not valid"});
        }

    } catch (error){
        //Error when creating a new list entry
        return res.status(500).json({message: "Error in registration", error: error});
    }
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

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    try {
      const author = req.params.author;
      let bookList = [];
      for (let book in books) {
        if (books[book].author === author) {
          bookList.push(books[book]);
        }
      }
      if (bookList.length > 0) {
        return res.status(200).json({message: bookList});
      } else {
        return res.status(404).json({message: "Book not found"});
      }
    }
    catch (error) {
      return res.status(500).json({message: "Error in getting the book details", error });
    }
  });
  

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    try {
        const title = req.params.title;
        let bookList = [];
        for (let book in books) {
          if (books[book].title === title) {
            bookList.push(books[book]);
          }
        }
        if (bookList.length > 0) {
          return res.status(200).json({message: bookList});
        } else {
          return res.status(404).json({message: "Book not found"});
        }
      }
      catch (error) {
        return res.status(500).json({message: "Error in getting the book details", error });
      }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    try {
        const isbn = req.params.isbn;
        let bookList = [];
        for (let book in books) {
          if (books[book].isbn === isbn) {
            bookList.push(books[book]);
          }
        }
        if (bookList.length > 0) {
          return res.status(200).json({message: bookList[0].review});
        } else {
          return res.status(404).json({message: "Review not found"});
        }
      }
      catch (error) {
        return res.status(500).json({message: "Error in getting the book review details", error });
      }
});

module.exports.general = public_users;
