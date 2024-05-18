const exp = require("constants");
const express = require("express");
const path = require("path");

const app = express();
const port = 5000;

// app comes with use method
// use takes 1 args rn:
// 1. the middleware you want to run
app.use(express.static("public"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  // express handle the basic headers
  // status code, mime-type
  res.sendFile(path.join(__dirname + "/index.html"));
  // res.send("<h1>This is homepage</h1>");
  // express handle the end()
});

app.post("/api", (req, res) => {
  console.log(req.body);
  res.json("Test");
});

app.listen(port, () => {
  console.log(`Running server, listening to port ${port}`);   
});
