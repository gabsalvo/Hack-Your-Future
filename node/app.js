/**
 * Introduction to Node.js
 * What is Node.js?
 *
 * Node.js is an open-source, cross-platform JavaScript runtime environment that allows you to run JavaScript on the server side. It was created by Ryan Dahl in 2009. The primary appeal of Node.js is its non-blocking, event-driven architecture that makes it suitable for I/O-heavy operations and scalable web applications.
 * Core Features of Node.js
 *
 *     Asynchronous and Event Driven: Node.js uses non-blocking, event-driven architecture, making it efficient and suitable for I/O-heavy operations.
 *     Single-threaded with Event Loop: Node.js operates on a single-thread model with event looping. This design choice helps Node.js handle multiple connections simultaneously.
 *     JavaScript Everywhere: Using JavaScript on both the frontend and backend increases productivity and unifies the software development stack.
 *     NPM: Node.js comes with a package manager called npm, which has a vast library of packages, making it easy to add new functionalities to your applications.
 *
 * Installing Node.js
 *
 * You can download and install Node.js from its official website. It includes npm (node package manager) by default. Installation is straightforward: download the installer for your platform and follow the prompts.
 * A Simple Node.js Application
 *
 */

// Here's how to create a basic Node.js application. This application will create a server that listens on port 3000.

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('Hello World');
});

app.listen(port, () => {
  console.log('Server running on http://localhost:3000/');
});

/**
 * Advanced Node.js Concepts
 * 1. Asynchronous Programming
 *
 * Node.js heavily utilizes asynchronous programming principles to handle non-blocking operations. It uses callbacks, promises, and async/await to manage asynchronous operations.
 *
 *     Callbacks: Functions that are passed as arguments to other functions and are executed after their parent function has completed.
 *     Promises: Objects representing the eventual completion or failure of an asynchronous operation. They provide a cleaner, more robust way to handle async logic.
 *     Async/Await: Syntactic sugar built on top of promises, making asynchronous code easier to write and read.
 *
 * Example Using Async/Await:
 */

const fs = require('fs').promises;

async function readFile(filepath, res) {
  try {
    const data = await fs.readFile(filepath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  } catch (error) {
    console.error('Error reading file:' , error);
    res.status(500).send('Failed to load file');
  }
}

app.get('/get-file', (req, res) => {
  readFile('./example.txt', res);
});

/**
 * Working with Databases
 *
 * Node.js can connect to various types of databases. Here's how you might connect to a MongoDB database using Mongoose, a popular ODM (Object Data Modeling) library.
 *
 *     Installation: First, you need to install mongoose via npm:
 *
 *     bash
 *
 * npm install mongoose
 */

// Example of Connecting to MongoDB:

/*const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected successfully');
});

const Schema = mongoose.Schema;
const SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date,
});

const SomeModel = mongoose.model('SomeModel', SomeModelSchema);*/

/**
 * Sure, here is how you can use curl to interact with the API we've set up using various CRUD operations:
 * GET (Read)
 *
 * To retrieve the list of items:
 *
 * bash
 *
 * curl http://localhost:3000/items
 *
 * This will send a GET request to the server, which will respond with the list of items.
 * POST (Create)
 *
 * To add a new item:
 *
 * bash
 *
 * curl -X POST -H "Content-Type: application/json" -d '{"name":"New Item"}' http://localhost:3000/items
 *
 * This command uses the -X option to specify the POST HTTP method, -H to set the Content-Type header to application/json, and -d to send the JSON data with the request.
 * PUT (Update)
 *
 * To modify an existing item, for example with id 1:
 *
 * bash
 *
 * curl -X PUT -H "Content-Type: application/json" -d '{"name":"Updated Item"}' http://localhost:3000/items/1
 *
 * This sends a PUT request to update the item with id 1 with a new name.
 * DELETE (Delete)
 *
 * To delete an item, for example with id 1:
 *
 * bash
 *
 * curl -X DELETE http://localhost:3000/items/1
 *
 * This command uses the -X option to specify the DELETE HTTP method to remove the item with id 1.
 *
 * Remember to have your server running when using these curl commands. If you're using Windows and encounter issues with single quotes in curl commands, try using double quotes and escape the JSON quotes like so:
 *
 * bash
 *
 * curl -X POST -H "Content-Type: application/json" -d "{\"name\":\"New Item\"}" http://localhost:3000/items
 *
 * These curl commands allow you to interact with your Node.js server directly from the command line, simulating actions that could be performed by a web client or another application.
 */

// We'll use a simple in-memory array to store our items as an example

let items = [{id: 1, name: 'Element'}];


// Middleware to parse JSON bodies
app.use(express.json());

//READ: Get All Items
app.get('/items', (req, res) => {
  res.json(items);
});

//CREATE: Add a new item

app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

//UPDATE: Modify an item

app.put('/items/:id', (req, res) => {
  let item = items.find(i => i.id === parseInt(req.params.id));
  if(!item) res.status(404).send('Item not found');
  item.name = req.body.name;
  res.json(item);
});

//DELETE: Remove an item

app.delete('/items/:id', (req, res) => {
  items = items.filter(i => i.id !== parseInt(req.params.id));
  res.status(204).send();
});

/**
 * Exercises:
 * Exercise 1: Basic Express Server
 *
 *     Objective: Set up a basic Express server that listens on port 3000.
 *     Tasks:
 *         Serve a static HTML file on the root route (/).
 *         Add a route that returns a simple JSON object when visited.
 *
 * Exercise 2: HTTP Methods
 *
 *     Objective: Understand and handle different HTTP methods.
 *     Tasks:
 *         Create a route that responds to GET requests at /about and returns a plain text message.
 *         Add a POST route at /submit that logs the JSON body sent to the server.
 *         Implement a PUT route at /update/:id that would theoretically update an item by ID (for now, just log the ID and the body).
 *         Create a DELETE route at /delete/:id that logs the ID of the item to delete.
 *
 * Exercise 3: Middleware
 *
 *     Objective: Use Express middleware to process requests.
 *     Tasks:
 *         Write a middleware function that logs the request method and the requested path for every request.
 *         Utilize the express.json() middleware to parse JSON bodies.
 *
 * Exercise 4: RESTful API with In-Memory Storage
 *
 *     Objective: Build a simple RESTful API to perform CRUD operations on an in-memory array of objects.
 *     Tasks:
 *         Define an array of objects, each with an id and a name, to act as your in-memory database.
 *         Implement RESTful routes (GET, POST, PUT, DELETE) to perform CRUD operations on the array.
 *         Ensure proper status codes are sent back in the response.
 *
 * Exercise 5: File Handling
 *
 *     Objective: Read and write data to files using the fs module.
 *     Tasks:
 *         Create a route that reads a file and sends the content back to the client.
 *         Implement a route that writes data to a file on the server based on the request body.
 *
 * Exercise 6: Advanced CRUD Operations
 *
 *     Objective: Expand the in-memory CRUD application to include more complex operations.
 *     Tasks:
 *         Add search functionality that allows users to find items by name in your in-memory array.
 *         Implement pagination in the GET route to limit the number of items returned.
 *
 * Exercise 7: Data Validation
 *
 *     Objective: Validate incoming data before performing operations.
 *     Tasks:
 *         Validate the JSON body on the POST and PUT routes to ensure required fields are included.
 *         Send a 400 Bad Request response if the validation fails.
 *
 * Exercise 8: Error Handling
 *
 *     Objective: Implement error handling in your application.
 *     Tasks:
 *         Add try/catch blocks where necessary to catch and respond to errors.
 *         Create a centralized error handler middleware to manage errors and send responses.
 *
 * Exercise 9: Unit Testing
 *
 *     Objective: Write tests for your API.
 *     Tasks:
 *         Set up a testing framework like Mocha and Chai.
 *         Write tests for each of your routes to ensure they return the correct status codes and outputs.
 *
 * Exercise 10: Authentication (Advanced)
 *
 *     Objective: Add basic authentication to your API.
 *     Tasks:
 *         Implement a signup route that adds a new user with a username and password to an in-memory store.
 *         Create a login route that checks a username and password and returns a simple token (e.g., a random string).
 *         Protect your CRUD routes so that only requests with a valid token in the header can access them.
 */
