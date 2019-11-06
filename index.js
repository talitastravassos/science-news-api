const express = require("express");
const app = express();
const scrap = require('./modules/scraping')

const { news, scraping } = scrap

app.get("/", (req, res) => {
  news.page = 1;
  scraping("https://www.sciencenews.org/all-stories");

  res.send(news);
});

app.get("/api/news", (req, res) => {
  news.page = 1;
  scraping("https://www.sciencenews.org/all-stories");

  setTimeout(() => {
    res.send(news);
  }, 5000);
});

app.get("/api/news/:page", (req, res) => {
  news.page = parseInt(req.params.page);
  scraping(
    `https://www.sciencenews.org/all-stories/page/${parseInt(req.params.page)}`
  );

  setTimeout(() => {
    res.send(news);
  }, 5000);
});

app.listen(4000, () => console.log("listening on port 4000"));
