const express = require('express');
const bodyParser = require('body-parser');
const Article = require('../models/db');
const path = require('path');
const readArticle = require('node-readability');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));
app.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));

const port = process.env.PORT || 3000;
app.set('port', port);
const articles = [{title:'example'}]

app.get('/', (req, res) => {
  Article.all((err, articles) => {
    if (err) {
      throw err
    }
    res.format({
      html: () => {
        res.render(path.resolve(__dirname, '../views/template.ejs'), { articles });
      },
      json: () => {
        res.send(articles);
      },
    });
  })
  
})

app.get('/articles', (req, res, next) =>{
 
  res.send(articles);
});

app.get('/articles/:id', (req, res, next) => {
  const { id } = req.param;

  Article.find( id, (err, article) => {
    if(err) { throw err }

    console.log(`fetching ${id}`);
    res.send(article)
  })
})

app.post('/articles', (req, res, next) => {
  const url = req.body.url;
  console.log(req.body);
  readArticle(url, (err, result) => {
    if(err || !result ){ res.status(500).send(`error download articles`) }
    Article.create( { title: result.title, content: result.content }, (err) => {
      if(err) { throw err }
      res.status(200).send('create success');
    })
  });
});

app.delete('/articles/:id', (req, res, next) => {
  const { id } = req.param;
  Article.find( id, (err) => {
    if(err) { throw err }
    res.send('delete success');
  })
})

app.listen(port, () => {
  console.log(`express web app at ${port}`);
})