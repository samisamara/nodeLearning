// In order to create a server, we need the http module
const http = require('http');

// .createServer() is the method that actually creates the server
// You can optionally store the instance of the server if you want to. 
// this function takes in a callback function as a parameter
// The callback function will run everytime a request comes in to our server
// within the callback function, we get access to two different objects: the request (req) object, and the response (res) object
// the request object is loaded with different information about the request, ex: the url, request type, etc
// the response object is what is used to send a response to the user in the browser
const server = http.createServer(() => {
  console.log('request made')
});
// NOTE: we have this server now, but it is not actually doing anything. It is just floating in our file. It is not actively listening for requests
// In order to actually use this server, we have to invoke the listen method. 
// To use the .listen() method, we have to pass in some arguments. First, we need the port number, which in our case is going to be 3000
// The second argument is "localhost". (localhost is the default argument, but here we are explicitly typing it)
// Third, we have to pass in a callback function, which fires when we start listening
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000')
});

