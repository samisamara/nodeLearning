// This is a chapter all about Express.js
// This is a very important chapter, since Express is what makes Node.js so great to use

// Express is a framework that helps us easily manage our routing, requests, server-side logic, and responses in a much more elegant way
// This makes our code easier to read, update, and extend
// Express is not required, since everything Express can do can also be achieved through raw Node
// However, Express is extremely good. It saves us lots of time, allows us to write clean code, and comes with extra features that helps us out.
// Here is a breakdown of the steps to using express

// 1: we have to install express into our app [npm install express]

// 2: we have to do is require express
// This code returns a function, and we store it in express
const express = require('express')

// 3: we have to set up an express app
// what this line does is it invokes the express() function, to create an instance of an express app, which is stored in the "app" constant
const app = express();

// 4: Our next step is to actually listen for requests
// Just like in server.js when we listened for port 3000, we need to do a similar thing for express
// Just like in plain Node, this code automatically infers that we want to use local host, so we do not have to add anything else
// This line also returns us an instance of the server, similar to plain Node's code [http.createServer((req, res) => {...})]
app.listen(3000);

// 5: We've set up an express app, and are now listening for requests in port 3000, now we want to actually respond to those requests
// in order to do this, we call the app variable, and the .get method
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

  res.send('<p>home page</p>');

});

