// Global Object
// the global object is very similar to the window object in javascript. 
// The global object does not need to be called directly, since it is inferred. 
// As an example, we can use the setTimeout() function without explicitly using the "global" keyword.
setTimeout(() => {
  // console.log('in the timeout');
}, 3000);
// NOTE: becuase Node.js works on the server side and not the DOM, we lose access to the window object. Luckily, we do not need the window object at all.

// __dirname and __filename
// These next two keywords are very helpful when working with other files and folders in our system, since this helps us build a path to our current file
// __dirname gives us the absolute path of the current folder our file is located in
// console.log(__dirname);
// __filename gives us the absolute path of the current folder WITH the file name added on as well
// console.log(__filename);