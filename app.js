// So far, we have only used one kind of request so far, and that is the post request
// We have plenty of other request types too. Here are some of the more important ones:
// GET - request to get a resource
// POST - requests to create new data (e.g. a new blog)
// DELETE - requests to delete data (e.g. delete a blog)
// PUT - requests to update data (e.g. update a blogs)


const express = require('express');
const { now } = require('lodash');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

const dbURI = "mongodb+srv://samisamara548:Applestore99@nodelearning.l389pd2.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', true);
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
// This is the file we added to for our POST request
// This is middleware that comes along with express
// { extended: true } is optional, it is an option we can add in if we want
// This code basically takes all of the url encoded data from the create view, and passes that into an object that we can use on the request object
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs')
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/about-us', (req, res) => {
  res.redirect('/about', { title: 'About' });
});

// blog routes
app.get('/blogs', (req, res) => {
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

// We did everything we needed to do to set up a POST request on the view side. Now, we have to create a POST handler in the blog routes
// To do this, we need to use the .post() method. Before we handled GET requests, now we are handling POST requests
// Within app.post(), we want to scope this to '/blogs'. After this, we also want to fire a callback function with the (req, res) objects
// Inside the callback function, we want to save a new blog document to the database
// but in order to do this, we need access to all that data that comes along in the post request we made in the create.ejs view
// First, we need to use middleware to pass the data we send into a workable format that we can use and it will attatch it to the req object
// To see this step further, view the "middleware and static files" section above
app.post('/blogs', (req, res) => {
  // Now that the middleware step is complete, we now have access to req.body, which contains all the information we need from the web form
  // Now our next step is to create a new instance of "blog" and inject our values into that instance
  // All we need to do now is use req.body inside Blog() since we made both objects indentical. This means they fit together perfectly
  const blog = new Blog(req.body);
  // After making the instance of the blog, we now have to save it to the database, using the .save() method
  // Like usual, this is asynchronous, so we want to add .then(), and fire a callback function when this function is complete
  // We want to redirect the user back to the home page after hitting submit, so they can see their new blog on the list.
  // To do this, all we need to do is 
  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err)
    });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});