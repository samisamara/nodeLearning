// We are going to create functions using a similar kind of naming convention named MDN, which looks like the following: 
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
// We are going to cut and paste all of the logic from the route handlers in their respective new functions
// We also do not want to forget to re-add the request and response objects, since that was what we did in the functions in blogRoutes.js
// We also want to import the Blog model, since all of the Blog logic will now be used here instead. 

const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
  .then((result) => {
    res.render('blogs/index', {
      title: 'All Blogs',
      blogs: result
    })
  })
  .catch((err) => {
    console.log(err);
  })
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('blogs/details', { blog: result, title: 'Blog Details' })
    })
    .catch(err => {
      console.log(err)
    })
};

const blog_create_get = (req, res) => {
  res.render('blogs/create', { title: 'Create a new blog' });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err)
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' })
    })
    .catch(err => console.log(err))
}

// Here, we are going to set up a module.exports and set it equal to an object
// Inside the object, we are going to list the function names, like blog_index for an example.
// Now, we have access to this blog_index function from anywhere we import this blogControllers.js file
module.exports = {
  blog_index,
  blog_details,
  blog_create_get, 
  blog_create_post, 
  blog_delete
}

// Side note, we put our create, details, and index views into a new blogs folder, and changed the file path to them when they get called
// We did this so we could sort our views and partials a little better
// We also have to slightly alter the file paths within the view files themselves, so they can find the partials correctly