// This chapter is all about MongoDB, mongoose, getting & saving data, and outputting documents in views
// This is a crucial chapter because without a proper database, we cannot save any data, like new blogs in this example

const express = require('express');
const { now } = require('lodash');
const morgan = require('morgan');
// The first step to incorperating Mongoose with MongoDB is to install it in our package [npm install mongoose]
// After this, just like every other package, we have to require it's module and make a variable for it, like the line below
const mongoose = require('mongoose');
// We want to have access to the blog model we made so we can get and push blogs. 
// To do this, we first give our variable a name, and then we require the route to that file
const Blog = require('./models/blog');

const app = express();

// The first step we need to use MongoDB is to first make a variable and set it equal to a string of the link we get from our MongoDB database
// We get this string from MongoDB's cloud website
// **We want to make this string AFTER where we declare our app, not before
// When we copy and paste from MongoDB's website, we have to find where <password> is in the string, & replace it with the password we set up there
// This string will be used later to make the connection to the database
const dbURI = "mongodb+srv://samisamara548:Applestore99@nodelearning.l389pd2.mongodb.net/?retryWrites=true&w=majority";
// **When we run this code, we get a deprecation error. The mongoose.set line is just there to get rid of the deprecation error
mongoose.set('strictQuery', true);
// The next step for MongoDB+Mongoose is to use the mongoose object to connect to the database
// The way we'd do this is to first call the mongoose object, and use a method called .connect()
// This expects a connection string as an argument, which we have as dbURI
// This line is actually an asynchronous task. This means it returns a promise. This means we are able to add a .then() method.
// The .then() method will fire after the connection is complete, after it has connected to the database
// In this callback function, we get a result, which we can use if needed
// We also get access to a catch method, so in case there is an error, we can catch that error
// This is very important because we do not want our server to be listening for requests until this connection has been made
// For an example, if a user requests the homepage, and that homepage lists a load of data dependent on the database...
// ...than we cant show that until the connection to the database has been established
// A way to circumvent this problem is to take the [app.listen(3000)] line and place it in the .then() block.
// This would make our website listen for requests only after the database has been established
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

// The next step is to create a schema and model for data. In our case, it is the blog data
// To do this, we are first going to create a new folder in the root of the project, and name it models
// We want to create a model and a schema for a blog, so inside the models folder, we are going to make a new file called "blog.js"

// register view engine
app.set('view engine', 'ejs');

// middleware & mongo sandbox routes
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// Now that we made our Blog model, we want to actually use it.
// This will be a sandbox route, we are going to hard code in our own blog to test this feature
// The first thing we want to do is create a get handler, similar to what we did with 'get'ting our views
// This will respond to requests to /add-blog, which is going to be used to add a blog to the collection
// When that request comes in, we want to fire a callback, using the req and res object like usual
// What we want to do is create a new instance of a blog document and then save that to the blogs database
// Before anything, we have to import the Blog model, which we exported in blog.js. This will be done on the top of the file
// Now that we imported Blog we can create a new instance of a blog by saying 'const blog = new Blog()' **We can call it whatever we want, but blog is best
// To explain this bit of code, we are using the model to create a new instance of a blog document within the code
// Inside Blog(), we pass an object with the different properties of this blog
// Remember that inside the schema, we that each blog should have a title (which is a string), a snippet (also a string), and a body (also a string).
// **We do not have to pass in the timestamps, mongoose automatically takes care of the timestamps for us
// We will follow that schema and input our own hardcoded data in matching that schema
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog 2', 
    snippet: 'about my new blog', 
    body: 'more about my new blog'
  });
  // Now that we have our new instance of the blog, we can use a method on this to save it to the database, and all we have to do is call 'blog.save()'
  // When we get a new instance of the blog model, it gives us a load of different methods that we can use. .save() is one of them
  // Under the hood, here is what mongoose is doing: 
  // First, it sees we used the Blog model, so it will look for the blogs collection based on the name
  // Then, it takes the new document that we created with it's information, and it will save it to the blogs collection. Mongoose does all this for us
  // This is an asynchronous function, so it will take some time, and it returns a promise, so we can add the .then() method
  // This will fire a callback function when the promise resolves
  // In the callback function, we get the 'result' object, so to show what is happening, we are going to send back a response of the result
  // As usual, we also have the .catch() method with the error object, so we will use that in case there is a problem
  blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Now we want to learn how to recieve all the current blogs in the collection
// First, we are going to use another get handler
// Just like before, we will also fire a callback function with the req and res objects
// Now comes the part were we get all the current blogs. Earlier, we made a Blog model, and automatically a bunch of methods were made for it
// The method we want to use to get all current blogs is Blog.find(). This gets us all of the documents in the "blogs" collection
// Again, these callback functions are all asynchronous, so we can use .then() as well as the results object from the database when it is finished
app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      console.log(err);
    })
});

// Here, we are going to learn how to find a single blog
// Just like the other mongoose functions, we first call app.get()
// Again, we call the Blog model, and the method we want to use this time is .findById()
// Whenever we save a new document to the database, an ID is automatically created, which is called an ObjectdId
// This is a unique type, and it is NOT a string when stored in MongoDB
// But when are using mongoose, it handles the conversion of ObjectId into a string, and back again when we need to.
// So if we want to find something by an ID, we can pass in a string in the .findByID() method, and Mongoose will handle that conversion and search for us
// Again, this function is asynchronous
app.get('/single-blog', (req, res) => {
  Blog.findById('63f563bef2433ec179306457')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
})

// routes
app.get('/', (req, res) => {
  const blogs = [
    {title: 'Sonic did a spin dash', snippet: 'Sonic did a spindash and it looked really cool. He than did a super peelout'},
    {title: 'Shadow used chaos control', snippet: 'Shadow had a chaos emerald and used chaos control. He used it to stop time'},
    {title: 'Silver used his telekinesis', snippet: 'Silver used his powers to lift a boulder. Afterwards, he launched the boulder at a mountain'}
  ];
  res.render('index', { title: 'Home', blogs: blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' });
});

app.get('/about-us', (req, res) => {
  res.redirect('/about', { title: 'About' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});