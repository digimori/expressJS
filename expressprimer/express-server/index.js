import express from "express";

// App creation using express
const app = express();

// Specifying port number:
const port = 3000;

app.get("/", (req, res) => {
  res.send("HELLO!");
});

app.post("/register", (req, res) => {
  res.sendStatus(201);
});

app.put("/user/Cee", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/Cee", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/Cee", (req, res) => {
  res.sendStatus(200);
});

// Listening on the app (port listening for requests from client side, callback which happens when the server runs)
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
