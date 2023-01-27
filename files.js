// The file system
// Node.js has the ability to read, write, and delete files within the file system, which is a very important tool and cannot be done in vanilla javascript
// In order to do this, we first need the fs module, which is built into Node.js (fs stands for "file system")
const fs = require('fs');

// reading files
// to read a file, we need to pass in two arguments: the file path, and a callback function with error and data arguments. 
// This is an asyncronous function, meaning it will take some time to do. Once it is complete, it will fire the callback function.
// This is a non-blocking code, so we do not need to worry about this function holding back the rest of the file
// fs.readFile('./docs/blog1.txt', (err, data) => {
//   if (err) {
//     console.log(err);
//   };
//   console.log(data.toString());
// });

// writing files
// fs lets us overwrite a file within the file structure, or make an entirely new file
// In order to do this, we need 3 arguments. First, the file path, second, the content you are writting in, and third, a call back function
// fs.writeFile('./docs/blog1.txt', 'Hello, World', () => {
//   console.log('file was written');
// });

// fs.writeFile('./docs/blog2.txt', 'Hello, Again Fellas!', () => {
//   console.log('file was written');
// });

// directories
// In addition to making new files, we can also make new directories. This function is an asyncronous function as well
// To do this, we need to call the mkdir function with two arguments: the file path you are creating, and a callback function
// If the directory already exists and you run the code, the code results in an error saying the file already exists
// in order to avoid this, we can use a method called existsSync() in a reverse if statement (!if) before running mkdir().
// Unlike the other functions, this is a syncronous method, meaning it is blocking code. However, this function is very quick
// just like mkdir, we can also use rmdir to remove a directory. 
// if (!fs.existsSync('./assets')) {
//   fs.mkdir('./assets', (err) => {
//     if (err) {
//       console.log(err);
//     };
//     console.log('folder created');
//   });
// } else {
//   fs.rmdir('./assets', (err) => {
//     if (err) {
//       console.log(err);
//     };
//     console.log('folder deleted')
//   });
// };

// deleting files
// just as we can create new files, we can also delete them from the file system. 
// to do so, we use the unlink() function. 
// this function has 2 parameters it needs to work: first, the file path, and second, a call back function, since it is asyncronous
if (fs.existsSync('./docs/deleteme.txt')) {
  fs.unlink('./docs/deleteme.txt', (err) => {
    if (err) {
      console.log(err);
    };
    console.log('file deleted')
  });
};

// NOTE: these functions work very well for small files such as these. 
// But if we are reading from/are writting to really large files, then it becomes much more efficient to streams to read and write to and from files