const express = require("express");
const path = require("path");
const cors = require("cors");

const indexRouter = require("./routes/index");
const moviesRouter = require("./routes/movies");
const searchRouter = require("./routes/search");

const app = express();
const port = 5000;

const apiKeyAuth = (req, res, next) => {
  const api_key = "qwerty";
  if (req.query.api_key !== api_key) {
    res.status(401).json({ success: false, message: "Invalid API_KEY" });
    return;
  }
  next();
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use(apiKeyAuth);
app.use("/", indexRouter);
app.use("/movie", moviesRouter);
app.use("/search", searchRouter);

app.get("/", (req, res) => {
  res.write("<h1>Homepage</h1>");
});

app.listen(port, () => {
  console.log(`Running server, listening to port ${port}`);
});
