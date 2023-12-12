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

- GET

```
// This will get the homepage ("/") and return/send a response of "HELLO!" to the client side.

app.get("/", (req, res) => {
  res.send("HELLO!");
});
```

These are endpoints, you use them for all destinations like /about, /contact etc.
