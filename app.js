// This is a chapter all about Express.js
// This is a very important chapter, since Express is what makes Node.js so great to use

// Express is a framework that helps us easily manage our routing, requests, server-side logic, and responses in a much more elegant way
// This makes our code easier to read, update, and extend
// Express is not required, since everything Express can do can also be achieved through raw Node
// However, Express is extremely good. It saves us lots of time, allows us to write clean code, and comes with extra features that helps us out.
// Here is a breakdown of the steps to using express

// 1: we have to install express into our app [npm install express]

// 2: we have to require express
// This code returns a function, and we store it in the variable named express
const express = require('express');

// 3: we have to set up an express app
// what this line does is it invokes the express() function, to create an instance of an express app, which is stored in the "app" constant
const app = express();

// 4: Our next step is to actually listen for requests
// Just like in server.js when we listened for port 3000, we need to do a similar thing for express
// Just like in plain Node, this code automatically infers that we want to use local host, so we do not have to add anything else
// This line also returns us an instance of the server, similar to plain Node's code [http.createServer((req, res) => {...})]
app.listen(3000);

// 5: We've set up an express app, and are now listening for requests in port 3000, now we want to actually respond to those requests
// in order to do this, we call the app variable, and the .get() method
// This takes in two arguments
// first, what path or url you want to listen to. In this case, we are listening to the root of the domain
// the second argument is a function, and this function takes in a request and response object, so we can do something with those.
app.get('/', (req, res) => {
  
  // If we wanted to send a response, we could do the same thing as before, like the code below, which would have been in plain Node
  // res.write('')
  // res.end()
  // Now that we are using express, we can use a third method now available to us: res.send()
  // What is great about res.send() is it infers the content type we are trying to send to the browser, and automatically sets the content type header
  // This means res.setHeader('Content-Type', 'text/html') and setHeaders like that are no longer needed, because express automatically does that for us
  // Another benefit to this is it also infers the status code, so we no longer need to manually set that
  // KEEP IN MIND THAT WE STILL SOMETIMES WANT TO MANUALLY SET STATUS CODES

  // it is almost never a good ideal to send html as a response. To perform the res.send command in Express, we will use res.sendFile()
  // res.sendFile() has two parameters. First is the path to that file
  // the first parameter has a slight problem. It is not meant to be a relative path. So we need to tell Express where it is relavant from.
  // That is where the second parameter comes into play. Here, we are making an object with a root argument that specifies what the root should be
  // That root is going to be the current directory, which we find by using __dirname
  // Here is a comparison between the two ways of sending a response
  // res.send('<p>home page</p>');
  res.sendFile('./views/index.html', { root: __dirname });

});

// Just like in plain Node, we need to have different route handlers set up for different urls. 
// Node.js uses a switch statement to do this, but that can get really messy really fast
// When adding route handlers in Express, this process is simplified greatly.
// All we need to do to add route handlers in Express is simply add multiple .get() handlers. Here is an example:
app.get('/about', (req, res) => {
  res.sendFile('./views/about.html', { root: __dirname });
});

// In Node, we learned how to do redirects, where we matched a case against a specific url, set the status code, and we set a header to be the location
// Redirects in Express is extremely easy to do. All we need to do is use the res.redirect() method, which is already built in to Express
// All it needs is a single argument, which is what we want to force our url to redirect to.
// Under the hood, Express sends this response to the browser, and forces it into a new requst for /about
// It also automatically sets the status code for us, so we do not need to manually set it ourselves
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// In Node, we learned how to add a 404 page by making it the default option in the switch statement and manually setting the status code to 404
// We can add 404s in Express as well, in a much easier fashion
// In order to add a 404 page in Express, we use the .use() function, which is built into Express
// We use the .use() function to create middleware, and fire middleware functions in Express
// There is much more we can use the .use() function for, but for now, all we care about is how can use it to make a 404 page
// Inside the .use() function, we fire a callback function, which also has access to the request and response objects
// The use function is going to fire for every single request coming in, but only if the request reaches this point in the code
// When we make a search and press enter, then Express will run through the code from top to bottom and look at every get handler it finds
// If it finds a match with the urls, it will fire the corresponding function. If it doesn't find a match, it carries on down the file
// When it finds a match, if Express sends a response to the brower within that match, then Express no longer carries on down to the rest of the code
// This is true even if those other handlers match as well, because we've already sent a response
// If we reach the bottom and there still has not been a match, it will see the app.use() function, and use it no matter what
// This is because the .use() function basically is saying "use this function for every incoming request"
// We do not need to set a url because it will run regardless of what the url is
// It is important that this function is placed at the bottom, because if it were to be placed above any get handlers, it would fire for every request
// This would mean anything below the .use() function would block anything underneath, so any get handlers would never get reached
// ALSO: while the .get() functions automatically set the status codes for us, this is not the case for .use()
// We actually have to manually set the status code to 404 ourselves, which we do by using the .status(404) function, and chain the rest of the code behind
// We can do this because .status() returns the response object itself, so we can just tack on the .sendFile() method and that still sends the file for us
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
})

