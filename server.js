// In order to create a server, we need the http module
const http = require('http');
const fs = require('fs');
// just as stated previously, there are plenty of modules we can include in our projects. This list also includes third party packages
// Node will always know to automatically look in the node_modules folder for information
// we do not have to call the lodash variable "_", we can call it whatever we want. But it is common practice to just call it "_".
const _ = require('lodash');
const { isAbsolute } = require('path');

// .createServer() is the method that actually creates the server
// You can optionally store the instance of the server if you want to. 
// this function takes in a callback function as a parameter
// The callback function will run everytime a request comes in to our server
// within the callback function, we get access to two different objects: the request (req) object, and the response (res) object
// the request object is loaded with different information about the request, ex: the url, request type, etc
// the response object is what is used to send a response to the user in the browser
const server = http.createServer((req, res) => {

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  // lodash
  // these are different functions included from the lodash library

  // If we want to create a random number, we can do that with lodash's .random() function
  // We can even specify a range within the paranthesis
  const num = _.random(0, 20);
  console.log(num);

  // If we want a function to only be allowed to run once, we can use lodash to do that
  // the way we would do that is call the .once() function, and place our callback function inside that
  const greet = _.once(() => {
    console.log('hello');
  });
  // now if we try to run this function twice, it will work the first time, but do nothing anytime after that.
  greet();
  greet();
  // There are plenty of other lodash methods, which can all be viewed in the lodash website
  /////////////////////////////////////////////////////////////////////////////////////////////////////



  console.log('request made')
  // req.url shows us the url after 3000, and req.method shows us the request type, which in this case is a GET.
  // console.log(req.url, req.method);

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
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    // There may be a case where you change the path name to be something else, but people might still be using an old link method
    // Example: www.webpage.com/about turning into www.webpage.com/about-me
    // In order to prevent errors, all we have to do is the following: 
    // 1. create a new switch case statement with the new old/new path name
    // 2. set the status code to 301 to show the file location has been moved
    // 3. set the header to the correct path
    // 4. end the process with res.end();
    case '/about-me':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default: 
      path += '404.html'
      res.statusCode = 404;
      break;
  };
  // NOTE: The status code describes what type of response is being sent to the browser and how successful the response was
  // There are many different status codes for loads of different scenarios. Here are a few examples: 
  // 200 - OK
  // 301 - Resource moved
  // 404 - Not found
  // 500 - Internal server error
  // As said earlier, there are loads of different status codes for loads of different reasons
  // But they all fall under different ranges, being 100, 200, 300, 400, and 500 range. Here is what each range is for: 
  // 100 Range - informational responses (for the browser)
  // 200 Range - success code (everything goes to plan)
  // 300 Range - codes for redirects
  // 400 Range - user or client error codes
  // 500 Range - server error codes
  // To add a status code, we simply need to use res.statusCode and assign a value to it. This can be seen in the switch statement above this comment block
  // We are making statusCode = 200 in the '/' and '/about' cases because if the code reached that point, that means everything went well
  // We make statusCode = 404 in the default case because that would mean the webpage does not exist/could not be found, resulting in an error


  // This line sends the path variable as the data parameter, and runs it if there is no errors
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      // if you are only returning one line, we can take a shortcut and just use res.end() and pass the data as an argument
      // res.write(data);
      // res.end();
      // This line ends the response, completing the job
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

