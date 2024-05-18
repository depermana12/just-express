const express = require("express");

const movieDetais = require("../data/movieDetails");

const router = express.Router();

router.get("/:movieId", (req, res) => {
  const movieId = req.params.movieId;

  const results = movieDetais.find((movie) => movie.id === +movieId);

  if (!results) {
    res.json({ message: "Movie not found" });
    return;
  }
  res.json(results);
});

module.exports = router;
