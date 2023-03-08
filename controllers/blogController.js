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

// This code had to be changed, because earlier, we were not handling an error where a certain blog ID was not found. The page would just load infinitely
// This is because all we did if there was an error is log the error to the console. 
// What we want to do is return a 404 page
// To fix this, most of the code will remain the same. All we do is remove the console.log line in the .catch() function
// We will istead return a 404 page, as well as a title for the error. We will also set the status to 404 as well
const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('blogs/details', { blog: result, title: 'Blog Details' })
    })
    .catch(err => {
      res.status(404).render('404', { title: 'Blog not found' })
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

module.exports = {
  blog_index,
  blog_details,
  blog_create_get, 
  blog_create_post, 
  blog_delete
}