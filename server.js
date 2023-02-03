// In order to create a server, we need the http module
const http = require('http');

const fs = require('fs');
const { isAbsolute } = require('path');

// .createServer() is the method that actually creates the server
// You can optionally store the instance of the server if you want to. 
// this function takes in a callback function as a parameter
// The callback function will run everytime a request comes in to our server
// within the callback function, we get access to two different objects: the request (req) object, and the response (res) object
// the request object is loaded with different information about the request, ex: the url, request type, etc
// the response object is what is used to send a response to the user in the browser
const server = http.createServer((req, res) => {
  console.log('request made')
  // req.url shows us the url after 3000, and req.method shows us the request type, which in this case is a GET.
  console.log(req.url, req.method);

  // response headers gives the browser information about what kind of response is coming back to it
  // This could be text, html, json, etc
  // response headers can also do things such as set cookies
  //res.setHeader has 2 arguments: first is the name of the value, and the second is specifying the content type.
  // There are 3 steps to sending a response to the header: set header, write data, and res.end()
  // First is to set the header
  // set header content type
  res.setHeader('Content-Type', 'text/html');

  // As of right now, there is only one view a user can see, that being the index.html page
  // Here, we are going to add the ability to see different pages dependant on the url
  // A simple way to do that is to create a variable, and append to that variable depending on what is clicked
  // Here, we are setting variable path = './views/' because all of our html pages are in the views folder
  // after this, we will make a switch statement to show different pages depending on req.url
  // what this switch statement is doing is checking the url and changing the path as a result
  // if the url does not match any of these options, the page will be set to the 404.html page as default
  let path = './views/';
  switch(req.url) {
    case '/': 
      path += 'index.html';
      break;
    case '/about':
      path += 'about.html';
      break;
    default: 
      path += '404.html'
      break;
  }


  // This line sends the path variable as the data parameter, and runs it if there is no errors
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // if you are only returning one line, we can take a shortcut and just use res.end() and pass the data as an argument
      // res.write(data);
      // res.end();
      res.end(data);
    }
  })
  // Next step is to write the content you want to send back to the browser
  // res.write lets you return content to the browser
  // we can use res.write numerous times. It writes both of those one after the other
  // res.write();
  // Lastly, we use res.end, which ends the response to the browser
  // res.end();
});
// NOTE: we have this server now, but it is not actually doing anything. It is just floating in our file. It is not actively listening for requests
// In order to actually use this server, we have to invoke the listen method. 
// To use the .listen() method, we have to pass in some arguments. First, we need the port number, which in our case is going to be 3000
// The second argument is "localhost". (localhost is the default argument, but here we are explicitly typing it)
// Third, we have to pass in a callback function, which fires when we start listening
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000')
});

