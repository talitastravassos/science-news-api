const cheerio = require("cheerio");
const axios = require("axios");
const uniqid = require("uniqid");

let news = {};

//scraping page script
const scraping = async url => {
  await axios.get(url).then(response => {
    const $ = cheerio.load(response.data);

    let posts = [];
    // post from web to object
    $(".river-with-sidebar__list___1EfmS li").each((i, el) => {
      let post = {};
      post.id = uniqid();
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
    });
    pushNewsToArray(posts);
  });
};

const pushNewsToArray = data => {
  news.data = data;
  //   console.log(news);
};

module.exports = {
  scraping,
  news
};
