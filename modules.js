// Modules & Require
// just like in most other programming languages, you need to keep all functions and methods modular
// This is how we import and export different files into other files

// Require statements
// We can import one file into another file by using a require statement
// First, we have to give it a variable name (this can be whatever you want)
// Then, you set the variable equal to require("relative file path"). Below is an example:
// const xyz = require('./people');
// NOTE: just because we import a file, doesn't mean we can access everything within the file. We can only access the file content within the original file
// The reason why this is the case is because we are not manually exporting the content within the file
// console.log(xyz);

// A nice way to import multiple different things from a different file is to use destructuring
// Here is an example of that:
const { people, ages } = require('./people')
// NOTE: for this method, the name must match the name in the original file
console.log(people, ages);

// Node.js comes with core modules built into it, and those modules can be required for added functionality. Here are a few examples: 
// os stands for "Operating System". Here we are importing it into the modules.js file
const os = require('os');
// a few example methods we can use is os.platform, which finds which platform we are on, and os.homedir, which finds our directory
// console.log(os.platform(), os.homedir());