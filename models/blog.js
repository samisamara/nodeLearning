// The first thing we need to do within this file is require the mongoose module
const mongoose = require("mongoose");
// The next thing we need to do is get the schema from the mongoose object
// To do this, we use mongoose.Schema but without paranthesis, and the "S" must be capital
// The Schema is what defines the structure of the documents that we are going to store inside a collection. It is the thing that a model wraps around
// .Schema is a constructor function, and we are going to use it to create a new schema
const Schema = mongoose.Schema;
// Next is to create a new schema. It can be named whatever you want, but you make it equal to a new schema
// This creates a new instance of a schema object
// Inside the Schema() constructor, we need to pass in an object as a parameter
// We need this object so it can describe the structure of the documents we want to store in our blogs collection
const blogSchema = new Schema({
  // Right here, we add the different properties that we want our blog objects to have
  // For an example, we want to have a title property, and we want to specify it has to be a String type, and make it required
  // To do this, we'd open it up as an object. Therefore, we can make schemas similar to SQL
  // After this object, we can add a second argument to the Schema constructor, which is a bit like an options object
  // In our case, we are going to set timestamps: true, so it can automatically timestamp properties for us on our blog documents as well
  title: { 
    type: String, 
    required: true
  }, 
  snippet: {
    type: String, 
    required: true
  }, 
  body: {
    type: String,
    required: true
  }
}, { timestamps: true });

// The next thing we need to do is create a model. that model is going to be based on the blogSchema
// The schema is the thing that defines the structure of the documents
// The model is what that surrounds that & then provides us with an interface by which to communicate with a database collection for that document type
// Now we make a variable for the model. Typically, the names for models are in capital letters
// We make that new variable equal to mongoose.model()
// .model() is going to take the name of the model as the first argument.
// The specific name is important because the model is going to look at this name, it's going to pluralize it, 
// and then it will look for that collection inside the database whenever we use this model in the future to communicate with the database
// For an example, we make a Blog model. We do not call it "Blogs", we specifically call it "Blog" instead.
// Remember that the name gets pluralized automatically. This means mongoose will look for the "blogs" collection by default
// The next argument is the schema we want to base this model on. So basically, what type of objects we are going to store in this collection
const Blog = mongoose.model('Blog', blogSchema);

// The last thing we need to do is export the Blog model so we can use it elsewhere in the project.
// We do this by using module.exports and setting it equal to our model
module.exports = Blog;