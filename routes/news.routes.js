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

router.route("/news").get((req, res) => {
  news.page = 1;
  scraping("https://www.sciencenews.org/all-stories");

  setTimeout(() => {
    res.send(news);
  }, 3000);
});

router.route("/news/:page").get((req, res) => {
  news.page = parseInt(req.params.page);
  scraping(
    `https://www.sciencenews.org/all-stories/page/${parseInt(req.params.page)}`
  );

  setTimeout(() => {
    res.send(news);
  }, 3000);
});

module.exports = router;
