// This chapter is all about MongoDB, mongoose, and getting & saving data
// This is a crucial chapter because without a proper database, we cannot save any data, like new blogs in this example

const express = require('express');
const { now } = require('lodash');
const morgan = require('morgan');

const app = express();

// The first step we need to use MongoDB is to first make a variable and set it equal to a string of the link we get from our MongoDB database
// We get this string from MongoDB's cloud website
// **We want to make this string AFTER where we declare our app, not before
// When we copy and paste from MongoDB's website, we have to find where <password> is in the string, & replace it with the password we set up there
// This string will be used later to make the connection to the database
const dbURI = "mongodb+srv://samisamara548:Applestore99@nodelearning.l389pd2.mongodb.net/?retryWrites=true&w=majority";

app.set('view engine', 'ejs');

app.listen(3000);

app.use(express.static('public'))

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