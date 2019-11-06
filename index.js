const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();

let news = [];

getNews = url => {
  axios.get(url).then(response => {
    const $ = cheerio.load(response.data);

    let posts = [];

    $(".river-with-sidebar__list___1EfmS li").each((i, el) => {
      let post = {};
      post.id = i + 1
      post.title = $(el)
        .find(".post-item-river__title___J3spU")
        .text()
        .replace(/\s\s+/g, "");
      post.category = $(el)
        .find(
          ".post-item-river__content___2Ae_0 .post-item-river__eyebrow___33ASW"
        )
        .text()
        .replace(/\s\s+/g, "");
      post.summary = $(el)
        .find(".post-item-river__excerpt___3ok6B")
        .text()
        .replace(/\s\s+/g, "");
      post.author = $(el)
        .find(".post-item-river__meta___RSvvi span")
        .text()
        .replace(/\s\s+/g, "");
      post.datetime = $(el)
        .find(".post-item-river__meta___RSvvi time")
        .attr().datetime;
      post.image = $(el)
        .find("figure a img")
        .attr().src;
      post.url = $(el)
        .find(".post-item-river__title___J3spU a")
        .attr().href;

      posts.push(post);
      pushNewsToArray(posts);
    });
  });
};

pushNewsToArray = data => {
  news = data;
  console.log(news);
};

app.get("/", (req, res) => {
  getNews("https://www.sciencenews.org/all-stories");
  res.send(news);
});

app.get("/api/news", (req, res) => {
  getNews("https://www.sciencenews.org/all-stories");

  res.send(news);
});

app.get("/api/news/:page", (req, res) => {
  getNews(`https://www.sciencenews.org/all-stories/page/${parseInt(req.params.page)}`);


  res.send(news);
});

app.listen(4000, () => console.log("listening on port 4000"));
