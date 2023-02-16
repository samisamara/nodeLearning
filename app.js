// This is a chapter all about using view engines
// View engines are meant for outputting dynamic content or data in a kind of template
// This is something express apps are able to use with ease
// there are a lot of options, such as express handlebars, pug, etc, but the one we will focus on for now is ejs, since it is very simple
// Here are the steps to using ejs

// First, we have to install ejs to our project [npm install ejs]

const express = require('express');
const { now } = require('lodash');

const app = express();

// Second, we have to specify that we want to use ejs as our view engine of choice for this application
// to do this, we have to register view engine
// For this, we use the app.set() function, which lets us configure our application settings
// One of those settings is view engine. So to set this, we first specify what setting we are changing in a string, which in our case is 'view engine'
// Next, we have to enter the name of that view engine in a string
// So now our code knows we are going to use the 'ejs' template
app.set('view engine', 'ejs');

// Third, we need a place to create our different ejs views
// **automatically, express and ejs will look in the 'views' folder 
// **If for an example, you wanted to create a different folder called something else, than you can tell express what that's going to be called like this: 
// **app.set('views', 'myviews')
// **Express would than know to find your views in the 'myviews' folder, but we will keep it the way it is currently, by looking for the views folder

// Forth, is to create the views
// To use view engines, we do not use html pages, we use something very similar, called ejs files
// To do this, all we need to do to create them is to create a new file in the views folder, named "index.ejs"


app.listen(3000);

// app.get('/', (req, res) => {
//   res.sendFile('./views/index.html', { root: __dirname });
// });
// In the commented code above, this is how we would display a file without ejs.
// Instead we will do what is known as 'render a view'
// To do that, we use the .render() method. This is how we take a view, render it, and send it back to the browser
// All we need to do within this method is specify what the view is called, minus the extension
// In this case, we want to render index.ejs, so we will simply enter a string 'index' in the render method
// Now, express will automatically look in the views folder, search for a file named 'index', use the ejs view engine, render it, & send it to the browser
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

// This is a handler function made for creating new blogs
app.get('/blogs/create', (req, res) => {
  res.render('create');
})

// redirects work the exact same for ejs. We are only going to leave it here to show there is no difference
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

app.use((req, res) => {
  res.status(404).render('404');
});