// This is a chapter all about middleware

const express = require('express');
const { now } = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.listen(3000);

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

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});