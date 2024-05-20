const express = require("express");

const movieDetais = require("../data/movieDetails");

const router = express.Router();

const requireJson = (req, res, next) => {
  const contentType = req.headers["content-type"];

  if (!contentType || contentType !== "application/json") {
    return res.status(400).json({
      status: "failed",
      message: "Content-type must be application/json",
    });
  }

  next();
};

router.param("movieId", (req, res, next) => {
  // update the db with analytics data
  console.log("Someone hit a route that used the movieId wildcard!");
  next();
});

router.get("/top_rated", (req, res) => {
  let page = +req.query.page || 1;

  const ratings = movieDetais.sort((a, b) => a.vote_average - b.vote_average);

  const firstPage = (page - 1) * 5;
  const nextPage = page * 5;

  let paginated = ratings.slice(firstPage, nextPage);

  res.json({ status: "success", data: paginated });
});

router.get("/:movieId", (req, res) => {
  const movieId = req.params.movieId;

  const results = movieDetais.find((movie) => movie.id === +movieId);

  if (!results) {
    return res.json({ status: "failed", message: "Movie not found" });
  }
  res.json(results);
});

router.post("/:movieId/rating", requireJson, (req, res, next) => {
  const movieId = +req.params.movieId;
  const userRating = req.body.value;

  if (userRating < 0.5 || userRating > 10) {
    return res.json({
      status: "failed",
      message: "Rating must be between 0.5 and 10",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Thank you for submitting your rating",
  });
});

router.delete("/:movieId/rating", requireJson, (req, res) => {
  res.status(200).json({ status: "success", message: "Rating deleted" });
});

module.exports = router;
