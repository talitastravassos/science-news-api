const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const app = express();

getNews = () => {
  let news = [{'jesus': 'cristo'}];

  request(
    "https://www.sciencenews.org/all-stories",
    (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);

        // const siteHeading = $(".river-with-sidebar__list___1EfmS");
        // console.log(siteHeading.text())

        // const output = siteHeading.children("li").text();
        // console.log(output)
        let posts = []

        $(".river-with-sidebar__list___1EfmS li").each((i, el) => {
          let post = {};
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
          post.time = $(el)
            .find(".post-item-river__meta___RSvvi time")
            .attr().datetime;
          post.image = $(el)
            .find("figure a img")
            .attr().src;

          posts.push(post)  
        //   console.log(post);
        //   return post;
        });

        console.log(posts)
      }
    }
  );

//   console.log(news);
  return news
};

app.get("/", (req, res) => {
  res.send(getNews());
});

app.get("/api/news", (req, res) => {
  res.send([1, 2, 3]);
});

app.listen(4000, () => console.log("listening on port 4000"));
