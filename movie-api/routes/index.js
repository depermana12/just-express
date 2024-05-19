const express = require("express");

const movies = require("../data/movies");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true });
});

router.get("/popular", (req, res) => {
  // get the variable from the query string
  let page = req.query.page || 1;

  let results = movies.filter((movie) => movie.most_popular);

  const firstPage = (page - 1) * 10;
  const nextPage = page * 10;

  let paginated = results.slice(firstPage, nextPage);

  res.json({ page, results: paginated });
});

module.exports = router;
