// 'fs' stands for 'file system', which is essentially all other files on your pc
// require("fs") gives us access to reading and writing data to the file system.
// calling this function will return an object which contains lots of functions we can use, and stores it in the variable
// The way we call modules such as this is by declaring a variable name, and assigning a requried module to that name
const fs = require("fs");

// This module gives us networking capabilities, such as building an http server
const http = require("http");

///////////////////////////////////////////////////////////////////////////////////////////////////
// FILES

// Here we are using the fs object function readFileSync to read a file, and then we save it to a variable and display it in the console.
// in order to use readFileSync, we have to get the file path of the destination we want to read, and the character encoding, which in this case
// is utf-8. Most of the time utf-8 works just fine.
// this is a synchronous function (blocking way)
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// Simple template string function. This can be used for variables, math functions, etc
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreate on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!");

// This is the non-blocking, asynchronous way of reading a file
// The parameters needed are the file path, the character encoding, and a callback function with two arguments: the error and the actual data
// it does not matter what you call the err and data arguments, they can be named whatever you want.
// All that matters is the error argument is first, and the data argument is second
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//   console.log(data);
// });
// console.log("Will read file!");

// In this example, the second file read will depend on the first one, and the third step will depend on the second step.
// This is because we will use the data for the file net
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);
//       // In this line, we only use the error argument, and no data. This is because we are not reading data in this line, so all we need is the error arg.
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('Your file has been written 😁');
//       });
//     });
//   });
// });
// console.log("Will read file!");

/////////////////////////////////////////////////////////////////////////////////
// SERVER

// First, we use our http module
// Just like before, we use a method that is on that object, just like we did with the fs module
// createServer will accept a callback function each time a new request hits our server
// This callback function gets access to 2 very important and fundamental variables: The request and response variable
// In this specific example, all we want to do is send a response back to the client
// Also, we have to save the results of the created server to a new variable, which here we will call 'server'
// creating the server is the first part. The second part is to actually listen to incoming requests from the clients
const server = http.createServer((req, res) => {
  // .end is a simple way of sending back a plain text response
  res.end("Hello from the server!");
});

// Here, we are using our created server to listen for incoming requests. (Basically starting up the server)
// This listen() function takes in a few arguments, which goes as follows:
// #1: The port. This argument is a number, which normally is 8000, but could be other numbers depending on the context, like 3000, 80 and so on.
// A port essentially is a sub-address on a certain host
// #2: The host. We don't actually need to specify this one since it will defualt to local host, however we can explicitly specify it as 'local host' if
// we want to. Local Host usually has the address 127.0.0.1 as default, & local host just means the current computer. the computer the server is running on
// An optional argument is a callback function, which will run as soon as the server actually starts listening
// Now all we have to do is look up '127.0.0.1' as a url on our computer on port 8000
server.listen(8000, () => {
  console.log("Listening to requests on port 8000");
});
