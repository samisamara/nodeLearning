// This chapter is all about Express router, MVC, and controllers
// As you may have noticed, our app.js file has been very long these past few chapters
// This makes the code within this file messy and hard to maintain
// Here we will learn how to use Express Router, and MVC, which will help us split our code into other files and make it much more manageable

// First we will learn about Express Router
// Express Router is a tool that comes with Express in of itself
// We use the Express Router to split our routes into different files, and manage them in small groups of routes that belong together
// This makes our app more modular, & it also makes it easier to update those parts of the map later on, & we don't have to have everything in one big file
// First we will notice a lot of routes use '/blogs' in them. We could split them into their own route file
// We should split these into their own file because they are all concerned with 1 type of source
// First, we are going to create a new folder named 'routes', and inside that folder we will make a new file called 'blogRoutes'
// We are naming it this because this new file will contain all of the blog routes.
// Now, we are going to cut every single blog related route from the file, and paste them in the new blogRoutes file
// Wihtin that file, we will set up the routers to work within that file, and come back to this file.
const express = require('express');
const { now } = require('lodash');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
// It is important to note that we no longer need this Blog module here, since we are not using it directly in this file
// We want to remove it from here, and instead cut and paste it into the blogRoutes file
// const Blog = require('./models/blog');
const { render } = require('ejs');

// There may be times where the MVC approach is preferable.
// MVC stands for Model, View, Controller
// MVC is a way of struncturing our code & files
// This keeps our code more modular, reusable & easier to maintain
// It is not essential to use the methodologies of MVC, but it can be extremely helpful. especially as the projects get larger
// We have already seen the M and the V in MVC (Models and Views), but here is a quick run down of the 3 parts
// M (Model) - Models are how we describe our data structure, and we use them to interact with the database
// V (View) - Views are where we make our HTML templates that a user will see
// C (Controller) - Controllers are what forms the link between oyur models and a views
// In a sense, Controllers are like the middle men who use models to get data and pass that data into a view
// We actually have already done that in our route handlers
// But the idea of using controllers is we just those handler functions into a separate controller file
// Then we can just reference those controller functions in our route file. 
// Again, this is not mandatory, but it does make our code easier to manage
// We are just splitting our code into different areas (files) and each area (file) has it's own job to do.  

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

// Now that we are importing our blog routes, we will use them inside our express app by using app.use(), as we would if we were using a bit of middleware
// All we need to do is type "blogRoutes" inside the paranthesis so we can use the blog routes
// What this code does is it looks at all the routes in blogRoutes.js, and applies all of the handlers to the app.
// If we wanted to, we could take an additional step and scope this to a specific URL. 
// We would scope this by changing the original [ app.use(blogRoutes) ] to include a string we want to look for in the URL, which in this case is '/blogs'
// This line means we are only going to apply the blogRoutes when we go to '/blogs'
// But if we used [ app.use('/blogs', blogRoutes) ], the webpage would not load, unless we typed "/blogs/blogs" in the URL
// The reason why this happens is because we are already looking for "/blogs" in blogRoutes.js. 
// By looking for "/blogs" in app.js as well, we are performing the same step twice, requiring us to look for "/blogs/blogs" instead of just "/blogs"
// We will fix this by only looking for "/blogs" in app.js, since this step comes first, and remove the "/blogs" part in blogRoutes.js
// This is because "/blogs" will be there automatically, since we are checking for that first here in app.js before calling the functions
// app.use(blogRoutes);
app.use('/blogs', blogRoutes);


app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

