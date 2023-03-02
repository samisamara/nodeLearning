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
const { render } = require('ejs');

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

// Now we want to learn how to request a single document (blog) from the database
// In order to do this, we need to learn about Route Parameters
// Route Parameters are parts of the routes that are variables, or could change
// In this example: { localhost:3000/blogs/:id } the id is a variable and can change
// If for an example, we went to localhost:3000/blogs/12345, the 12345 part is a route parameter
// This is not limited to just numbers. The route parameters could be the word "hello"
// All we are saying is the ":id" part of the route is changeable. It's like a variable that a user types in
// We want to be able to extract this to see if it's an id, then we can query the database for the document with that id and send it back to the user
// We already wrapped our code for each blog in an anchor tag that will link to each individual post, now we have more work to do on the server side
// First, we want to create a GET request for when we are looking at an individual blog. The first part is simply { '/blogs/' }
// As for the individual blog, we need to denote our route parameter.
// In order to denote a route parameter, we use colon (:) and then id
// We do not want to forget the : because if we looked for /blogs/id the website would literally try to reroute to the name "id" not the actaul blog
// We also need to take a callback function just like the other GET requests
// Inside this function, we want to try to find a single document in the database, with the id
// But first we have to extract this id. We can get that id with the request object
// to do this, we will make a new variable and set it equal to the id, which we will get using the .params property
// After the .params, we want to use whatever name we used for the route parameter. Here it is called "id" so we will say {.id}
//**It does not need to be named "id". If for an example, we named it "bloggers", we would use req.params.bloggers
app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  // Now that we have the id, we have to get the document with this id from the database
  // to do this, we will use our Blog() model, and use it's function .findById() and pass in the id inside it.
  // As usual, we use the .then() method and a callback function
  // Inside the callback function, we want to render a "details" page for the blog we want to show. 
  // The first argument is going to be 'details' since this is what our view will be called
  // For the second argument, we want to pass through the data that we get back
  // We will call the property "blog" but it can be called whatever you want
  // And that property will be equal to the result because the "result" in the .then() method because the result will be the single blog based on the id
  // We also want to send in a "title" like every other route in our project, which will be "Blog Details"
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' })
    })
    .catch(err => {
      console.log(err)
    })
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

