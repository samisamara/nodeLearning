// 'fs' stands for 'file system', which is essentially all other files on your pc
// require("fs") gives us access to reading and writing data to the file system.
// calling this function will return an object which contains lots of functions we can use, and stores it in the variable
const fs = require("fs");

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
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(data2);
    fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
      console.log(data3);
      // In this line, we only use the error argument, and no data. This is because we are not reading data in this line, so all we need is the error arg.
      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
        console.log('Your file has been written 😁');
      });
    });
  });
});
console.log("Will read file!");