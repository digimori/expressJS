import express from "express";

const app = express();
const port = 3000;

// For this, we're logging the request method and the URL, then moving to the app.use
function logger(req, res, next) {
  console.log("Request method: ", req.method);
  console.log("Request url: ", req.url);
  next();
}

// This will now use the middleware, to run these logs, and then with next() move onto the http requests below it
app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
