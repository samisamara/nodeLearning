// This is chapter 7

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

// middleware & mongo sandbox routes
app.use(express.static('public'));
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
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});