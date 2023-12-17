# What is ExpressJS?

- A Backend framework built on top of NodeJS
- Allows us to use JavaScript and Node to build a backend

## Why ExpressJS?

- Because Node is too large a tool and gives too many options and we're just trying to build websites here.

### Example Node vs Express for a simple website code:

- This is rendering a home page if the url path is root (/) and an about page if the path is /aboutus.
- Else, renders a 404 not found page

```
import http from "http";
import url from "url";

const server = http.createServer((req,res) => {
    const parsedUrl = url.parse(req.url, true);

    if(parsedUrl.pathname === '/' && req.method === "GET") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("<h1>Welcome to the Homepage!</h1>");
    } else if (parsedUrl.pathname === '/about' && req.method === "GET") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end("<h1>About us!</h1>");
    } else {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("<h1>Page not found</h1>");
    }
});
    server.listen(3000, () => {
        console.log("Server running at Localhost:3000");
    })
```

- VS Express + NodeJS:

```
import express from 'express';
const app = express();

app.get("/", (req,res) =>{
    res.send("<h1>Welcome to the Homepage!"</h1>);
})
app.get("/about", (req,res) =>{
    res.send("<h1>About us"</h1>);
})

app.use((req,res)=> {
    res.status(404).send("<h1>Page not found</h1>");
})

app.listen(3000, ()=>{
    console.log("Server running on Localhost:3000");
})
```

- Express and Node together makes the code more readable and modular, making it easier to write and add things to like middleware.

## Server creation with ExpressJS and NodeJS:

- Create directory (server folder) and cd into it (cd server)
- Create index.js file (touch index.js) - Make sure "main" points to this in the package.json
- Initialise NPM (npm init -y) - This will create a package.json
- Install the Express package (npm install express)
- Install nodemon (npm install -g nodemon) - Means we don't have to manually stop and start server when changes are made

```
nodemon filename.js // instead of node filename.js
```

- Remember to add the "type":"module" to your package.json to allow ES6.

- Write server application in index.js

```
import express from "express";
const app = express();

app.listen(3000, () => {
    console.log("Listening on port 3000");
})
```

- Start server

```
node appname.js
```

## Http Requests

Request vocab:

- GET
  Request a resource from the server (HTML site, data from database etc)

- POST
  Sending resource to the server (Information, forms, data for the database etc)

- PUT (Update method)
  This is used to "Update" a resource by replacing it completely with another one

- PATCH (Also Update method)
  This is used to "Patch up" a resource by updating only the part that needs it

- DELETE
  Deletes the resource

### Writing the requests:

```
// This will get the homepage ("/") and return/send a response of "HELLO!" to the client side.

app.get("/", (req, res) => {
  res.send("HELLO!");
});

// This is sending data for the server side to do something with it
app.post("/register", (req, res) => {
  res.sendStatus(201);
});

app.put("/user/Cee", (req, res) => {
  // This is replacing the resource with whatever gets sent in this code block
  res.sendStatus(200);
});

app.patch("/user/Cee", (req, res) => {
  // This will update whichever sections are selected with this resource
  res.sendStatus(200);
});

app.delete("/user/Cee", (req, res) => {
  // This will delete the resource
  res.sendStatus(200);
});
```

These are endpoints, you use them for all destinations like /about, /contact etc.

## Middleware:

- When a request comes in to the server and before it is processed by the route handlers (http requests), middleware pre-processes them.
- Can be used to log the request (type, how long the request took, the status of the request handled, authentication, error handling etc).

- Commonly used Node/Express middleware - body-parser:

```
npm i body-parser

// Import it into your app:
import bodyParser from "body-parser";
```

- Often gets used to handle form data

### Using body-parser:

- Used to parse data that's sent back and fourth between server and client (Remember to import it at the top of your file).
- To use it:

```
// We call bodyParser with the method urlencoded to tell it what we want
app.use(bodyParser.urlencoded({extended: true}));
```

- With this method, every request now has a body to send back, so we can "see" what we're doing.

## Middleware types:

- Pre-processing (body-parser belongs to this type)
- Authentication
- Error handling
- Logging (morgan belongs to this type)

### morgan

- [morgan NPM docs](https://www.npmjs.com/package/morgan)
- morgan is a HTTP request logger middleware for use with node.js (It logs the requests that come into the server)

```
npm i morgan

// API:
var morgan = require('morgan')
// Remember this can be turned into an import like we did previously with body-parser
import morgan from 'morgan';

// Using it as middleware functions similarly to body-parser with the app.use method:
app.use(morgan("combined"))
```

- The above code is using the linked format: [docs link](https://www.npmjs.com/package/morgan#expressconnect)
- We can test this through Postman (The GET method we've written at this point)
- It should, if done correctly, return the values set (We've used combined, so it will parse all of the details that come with that string.)

## Creating our own middleware:

- app.use() is there to specify what middleware to use when the request is pinged.
- Inside of this method, we can pass a function.
- Order is important!

```
// Example:
app.use((req, res, next) => {
  console.log("Request method: ", req.method);
  next(); // Next is used to determine when we should move on from the middleware to continue the flow of the remaining handlers
})
```

- Building our own, just for basic logging:

```
// For this, we're logging the request method and the URL, then moving to the app.use
function logger(req, res, next) {
  console.log("Request method: ", req.method);
  console.log("Request url: ", req.url);
  next();
}

// This will now use the middleware, to run these logs, and then with next() move onto the http requests below it
app.use(logger);

```

- It's probably worth considering adding try/catch blocks to these, just in case there are issues which will make Postman just hang.

