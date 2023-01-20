// Stream are much more efficient when reading or writting files that are ginormous in size, since methods like readFile() are better for small files
// Streams lets us use data before it has been fully written
// The way streams work is small chunks of data are packaged up in what is called a buffer.
// The data is sent down the stream everytime a buffer fills.
// So everytime we get a new chunk of data from the buffer, we can start using it
// A good example of this are video websites like YouTube or Netflix
// Little bits of data are sent through buffers, which lets you start watching the video before it is fully loaded


// the streams methods are under the fs module
const fs = require('fs');

// Read streams
// to read streams, we first create a variable with a name of our choosing, and then we call the function fs.createReadStream()
// There are 2 arguments for this method: First, the file path of where we want to pass the data from, and...
// ...second, on 'option' object where we specify the encoding, which we will choose 'utf8', meaning it will encode the data as it comes in
// this means it will automatically be in a readable format
const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8' });

// write streams
// just like read stream, the same works for writing a large amount of data into a new or existing file
// to do this, we first need to specify a variable set to fs.createWriteStream() with the file path, just like createReadStream()
const writeStream = fs.createWriteStream('./docs/blog4.txt');

// on our readStream, we have something called .on, which is an event listener.
// .on is similar to something like a button and it's click event, but this time we are listening to a 'data event'
// A data event is essentially everytime we recieve a buffer of data from the stream
// So everytime we get a new chunk of data, we fire the data callback method and get access to that chunk of data
// readStream.on('data', (chunk) => {
//   console.log('----- NEW CHUNK -----');
//   console.log(chunk);
  // What this line is doing is everytime we get a new piece of data from the readStream(), we take that bit of data and write...
  // ..."NEW CHUNK", then we write the new chunk to the file
  // This is how to pass data down a stream: a writeStream()
  // We pass through a new chunk of data using the .write() method.
  // In short, we arenow using this writeStream to send a bit of data down it at a time to write to the new file
//   writeStream.write('\nNEW CHUNK\n');
//   writeStream.write(chunk);
// });

// Piping
// Pipes works well when you are passing data directly from a readable to a writable stream
// It is basically a much shorter way of writing the code above this comment
// Pipes must be from a readable stream to a writable one, otherwise it does not work
// what this code is doing is opening up the readStream, reading data, and every time we get a chunk under the hood, it is piping that into the writeStream
readStream.pipe(writeStream);