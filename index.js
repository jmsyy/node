const express = require('express');
const bodyParser = require('body-parser');
const readArticle = require('node-readability');
const path = require('path');
const Article = require('./models/db');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'));
app.set('port', process.env.PORT || 8080);

app.get('/articles', (req, res, next) => {
  Article.all((error, articles) => {
    if (error) {
      return next(error);
    }
    res.format({
      html: () => {
        res.render(path.resolve(__dirname, 'views/template.ejs'), { articles });
      },
      json: () => {
        res.send(articles);
      },
    });
  });
});

app.get('/articles/:id', (req, res, next) => {
  const { id } = req.params;
  Article.find(id, (error, article) => {
    if (error) {
      return next(error);
    }
    res.send(article);
  });
});

app.post('/articles', (req, res, next) => {
  const { url } = req.body;
  readArticle(url, (error, result) => {
    if (error || !result) {
      res.status(500).send('Error download article');
    }
    const { title, content } = result;
    Article.create({ title, content }, (err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.send('create ok');
    });
  });
});

app.delete('/articles/:id', (req, res) => {
  const { id } = req.params;
  Article.delete(id, (error) => {
    if (error) {
      return next(error);
    }
    res.send({ message: 'Delete Ok' });
  });
});

app.listen(app.get('port'), () => {
  console.log('webServer started on port', app.get('port'));
});
module.exports = app;