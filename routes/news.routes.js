const express = require("express");
const router = express.Router();
const path = require("path");

const scrap = require("../scripts/scraping");

const { news, scraping } = scrap;

router.use(function(req, res, next) {
  // run for any & all requests
  console.log("Connection to the API.."); // set up logging for every API call
  next(); // ..to the next routes from here..
});

router.route("/").get((req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

router.route("/news").get(async (req, res) => {
  news.page = 1;

  await scraping("https://www.sciencenews.org/all-stories");

  res.send(news);
});

router.route("/news/:page").get(async (req, res) => {
  const { page } = req.params;
  news.page = parseInt(page);

  await scraping(
    `https://www.sciencenews.org/all-stories/page/${parseInt(page)}`
  );

  res.send(news);
});

router.route("/news/category/:category").get(async (req, res) => {
  const { category } = req.params;
  news.page = 1;

  await scraping(`https://www.sciencenews.org/topic/${category}`);

  res.send(news);
});

router.route("/news/category/:category/:page").get(async (req, res) => {
  const { page, category } = req.params;
  news.page = parseInt(page);

  await scraping(`https://www.sciencenews.org/topic/${category}/page/${page}`);

  res.send(news);
});

module.exports = router;
