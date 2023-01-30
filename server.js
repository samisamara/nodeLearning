// In order to create a server, we need the http module
const http = require('http');

const fs = require('fs');

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
  // There are 3 steps to sending a response to the header: 
  // First is to set the header
  // set header content type
  res.setHeader('Content-Type', 'text/html');
  // This line sends the index.html file as the data parameter, and runs it if there is no errors
  fs.readFile('./views/index.html', (err, data) => {
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

