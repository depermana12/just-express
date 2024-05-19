const express = require("express");

const movies = require("../data/movies");
const people = require("../data/people");

const router = express.Router();

const queryRequired = (req, res, next) => {
  const searchTerm = req.query.query;
  if (!searchTerm) {
    return res.json({ status: "failed", message: "Query is required" });
  }
  next();
};

router.use(queryRequired);

router.get("/movie", (req, res) => {
  const searchTerm = req.query.query.toLowerCase();
  const results = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(searchTerm);
  });

  res.json({ status: "success", data: results });
});

router.get("/person", (req, res) => {
  const searchTerm = req.query.query.toLowerCase();
  const results = people.filter((person) => {
    return person.name.toLowerCase().includes(searchTerm);
  });

  res.json({ status: "success", data: results });
});

module.exports = router;
