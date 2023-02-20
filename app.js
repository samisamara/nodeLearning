// This chapter is all about MongoDB, mongoose, getting & saving data, and outputting documents in views
// This is a crucial chapter because without a proper database, we cannot save any data, like new blogs in this example

const express = require('express');
const { now } = require('lodash');
const morgan = require('morgan');
// The first step to incorperating Mongoose with MongoDB is to install it in our package [npm install mongoose]
// After this, just like every other package, we have to require it's module and make a variable for it, like the line below
const mongoose = require('mongoose');

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


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host:', req.hostname);
  console.log('path', req.path);
  console.log('method: ', req.method);
  next();
});

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