// This is a chapter all about middleware
// Middleware is basically a name for any code that runs (on the server) between getting a request and sending a response
// For an example, the .use() method is generally used to run some middlware code
// We've seen this already when we handled our 404 cases
// We do not only have to have just 1 bit of middleware, we could have more than 1 piece of middleware that runs on the server
// The functions that run in our GET handlers, are essentially middleware
// Middleware runs from top to bottom in our code
// It runs this way until it exit the process, or explicitly sends a response to the browser
// There are many cases where middleware can be used. Here are a few examples: 
// 1. Logger middleware to log details of every request
// 2. Authentication check middleware for protected routes
// 3. Middleware to parse JSON data from requests
// 4. Return 404 pages


const express = require('express');
const { now } = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.listen(3000);

// We are going to create our own custom middleware. This middleware will log out some details out to the console for every request
// **hostname, path, and method are all properties on the request object
// When we run this code, the function will work just fine, but express does not know what to do next, as in it does not know how to move on
// 
app.use((req, res) => {
  console.log('new request made:');
  console.log('host:', req.hostname);
  console.log('path', req.path);
  console.log('method: ', req.method);
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
  res.render('create', { title: 'Create Blog' });
})

app.get('/about-us', (req, res) => {
  res.redirect('/about', { title: 'About' });
});

// This block of code is an example of middleware. If there are no matches in the browser url, this piece of middleware will fire
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});