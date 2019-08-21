const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');

const app = express();
const server = app.listen('3077', () => {
  const host = server.address().address;
  const { port } = server.address();

  console.log('Your App is running at http://%s:%s', host, port);
});
let hostNews = [];
const getHostNews = (res) => {
  const $ = cheerio.load(res.text);
  $('div#pane-news ul li a').each((idx, ele) => {
    const news = {
      title: $(ele).text(), // 获取新闻标题
      href: $(ele).attr('href'), // 获取新闻网页链接
    };
    hostNews.push(news);
  });
  return hostNews;
};

superagent.get('http://news.baidu.com/').end((err, res) => {
  if (err) {
    console.log(err);
  } else {
    hostNews = getHostNews(res);
  }
});

app.get('/', async (req, res) => {
  res.send(hostNews);
});
