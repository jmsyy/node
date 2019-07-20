const express = require('express');
const app = express();
const superagent = require('superagent');
const cheerio = require('cheerio');

let server = app.listen('3077',()=>{
    let host =server.address().address;
    let port = server.address().port;
    
    console.log('Your App is running at http://%s:%s', host, port);
});



let hostNews = [];
let localNews = [];
const getHostNews = (res)=>{
    let hostNews =[];
    const $ = cheerio.load(res.text);
    $(`div#pane-news ul li a`).each((idx,ele)=>{
        let news = {
            title: $(ele).text(),        // 获取新闻标题
            href: $(ele).attr('href')    // 获取新闻网页链接
        };
        hostNews.push(news);
    });
    return hostNews;
}

superagent.get('http://news.baidu.com/').end((err,res)=>{
    if (err) {
        
    }else {
        hostNews = getHostNews(res);
    }
});

app.get('/',async (req,res)=>{
    res.send(hostNews);
});

