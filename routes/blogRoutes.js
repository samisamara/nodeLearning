// This is a note block in relation to Express Routes
// In here, we copied all the blog routes in app.js and pasted them all here
// If we left it the way it is, these routes would not work because we are trying to attatch all of these route handlers to the "app" instance
// But this app instance is not set up and defined in this file.
// To fix this, here are the steps we are going to do:
// 1: Require express
// 2: Create a new Express Router (explained further on Step 2)
// 3: Export the router

// Step 1
const express = require('express');
//**Here we copied and pasted the Blog model from app.js, but the route to reaching that file is now different
// The commented out code is what it used to be, and the most current verison is right underneath
// const Blog = require('./models/blog');
const Blog = require('../models/blog');

// Step 2
// using express.Router() WITH A CAPTIAL "R" is what creates us a new instance of a router object
// Now, we can use the router instance instead of the app. All we have to do is swap the word "app" in the routers with the word "router"
const router = express.Router();

// So far, what we have done is create an instance of the router, which is like a mini app. 
// Standing along, this does not do anything. We have to use the router inside an app.

//**BONUS NOTE
// when we search for /blogs/create, there is no telling if that "create" part is an id.
// By placing the '/blogs/:id' route handler first, the website may confuse the word "create" as an actual id
// To fix this problem, we have to place the "create blog" handler above the '/blogs/:id' handler, since our code runs from top to bottom
// This way, either create is found and used first, or the code moves on to the id.
router.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
//  Check the scoping thing in Net Ninja's video first!!!! Towards the end of the Express Router section  //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', {
        title: 'All Blogs',
        blogs: result
      })
    })
    .catch((err) => {
      console.log(err);
    })
});

router.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err)
    });
});

router.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' })
    })
    .catch(err => {
      console.log(err)
    })
});

router.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' })
    })
    .catch(err => console.log(err))
});

router.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' });
});

// Step 3
// Now that we are using the router instance, we want to export this so we can use it in the app instance. 
// We do this by using module.exports and setting it equal to the router instance
module.exports = router;