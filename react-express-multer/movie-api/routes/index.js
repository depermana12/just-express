const express = require("express");
const fs = require("fs");
const multer = require("multer");
const uploadBucket = multer({ dest: "public/images/tmp" });

const connectDB = require("../config/db");

const movies = require("../data/movies");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ success: true });
});

router.post("/uploadFile", uploadBucket.single("file"), (req, res) => {
  console.log("uploaded");
  res.json("file uploaded!");
});

router.get("/getdb", async (req, res) => {
  try {
    const db = await connectDB();
    const results = await db.collection("products").find({}).toArray();
    res.json({ status: "success", data: results });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
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
