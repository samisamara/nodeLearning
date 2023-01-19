const people = ['Silver', 'Vector', 'Espio', 'Charmy', 'Cream'];
const ages = [14, 20, 16, 6, 6]

// console.log(people);

// Exports
// everything within this file cannot be accessed by any other file. This is because these values are not manually exported
// To allow outside files to have access to anything within this file, we have to use module.exports
// in this example, we set module.exports equal to hello. if we run "node modules.js" and console.log xyz, it will now be equal to hello.
module.exports = 'hello';
// in this line, we are overwriting the previous module.export to make it export the people variable, which is more ideal
module.exports = people;
// We can only export one value at a time. But what if you want to send numerous different values?
// We can do that by returning an object, with different values as attributes to that object
module.exports = {
  people, ages
}