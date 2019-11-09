const express = require("express");
const router = express.Router();

const scrap = require("../scripts/scraping");

const { news, scraping } = scrap;

router.use(function(req, res, next) {
  // run for any & all requests
  console.log("Connection to the API.."); // set up logging for every API call
  next(); // ..to the next routes from here..
});

router.route("/").get((req, res) => {
  res.send("Welcome to the Science News API");
});

router.route("/news").get(async (req, res) => {
  news.page = 1;
  await scraping("https://www.sciencenews.org/all-stories");

  res.send(news);
});

router.route("/news/:page").get(async (req, res) => {
  news.page = parseInt(req.params.page);
  await scraping(
    `https://www.sciencenews.org/all-stories/page/${parseInt(req.params.page)}`
  );

  res.send(news);
});

module.exports = router;
