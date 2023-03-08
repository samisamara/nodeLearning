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
// We moved this model into blogController.js, since the logic is no longer used here and is instead used in that file. 
// const Blog = require('../models/blog');
// We set up the export for our controller file, here, we are importing it into this router file
const blogController = require('../controllers/blogController');

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
router.get('/create', blogController.blog_create_get);

// This is the first part of using the MVC approach. The aim is to make our code cleaner and neater
// What we have done is extracted all of our route handler functions and placed those into a seperate controller file
// Then we can just reference those controller functions from this route file
// First, we made a new folder named "controllers" and a file within that folder named "blogController.js"
//**Notice how we have a "models", "views", and "controllers" folder. We now have all 3 components in the MVC methodology
// For MVC, we cut all of the logic from this function and pasted it in the controller function.
// We instead replace the callback function with a call to blogController's blog_index function
// This does the exact same thing, it's just now we've extracted everything here and placed it in a controller file
// We will repeat this step for every other route handler function
router.get('/', blogController.blog_index);

router.post('/', blogController.blog_create_post);

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);

// Step 3
// Now that we are using the router instance, we want to export this so we can use it in the app instance. 
// We do this by using module.exports and setting it equal to the router instance
module.exports = router;