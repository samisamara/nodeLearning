// 'fs' stands for 'file system', which is essentially all other files on your pc
// require("fs") gives us access to reading and writing data to the file system.
// calling this function will return an object which contains lots of functions we can use, and stores it in the variable
const fs = require("fs");

// Here we are using the fs object function readFileSync to read a file, and then we save it to a variable and display it in the console.
// in order to use readFileSync, we have to get the file path of the destination we want to read, and the character encoding, which in this case
// is utf-8. Most of the time utf-8 works just fine.
// this is a synchronis function
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// Simple template string function. This can be used for variables, math functions, etc
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreate on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!");
