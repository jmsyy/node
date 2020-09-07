const Entry = require("../models/entry");

exports.form = (req, res) =>{
  res.render('post', {title: 'Post'})
}

exports.submit = (req, res, next) =>{
  const data = req.body.entry;
  const user = res.locals.user;
  const userName = user?user.name : null
  const entry = new Entry({
    userName,
    title:data.title,
    body:data.body
  });

  entry.save((err) =>{
    if(err) {throw err}

    res.redirect('/')
  })
}

exports.list = (req, res, next) => {
  Entry.getRange(0, -1, (err, entries) => {
    if(err){ throw err }
    res.render('entries', {
      title: 'Entries',
      entries,
    })
  });
}