function paseFiled(field) {
  return field.split('/\[|\]/').filter(v => v)
}

function getFiled(req, field) {
  let val = req.body;
  field.forEach(prop => {
    val = val[prop]
  });
  return  val;
}


exports.required = (field) => {
  field = paseFiled(field);
  return (req, res, next) =>{
    if (getFiled(req, field)) {
      next()
    }else {
      res.error(`${filed.join('')} is required`);
      res.redirect('back')
    }
  }
}

exports.lengthAbove = (field, len) =>{
  field = paseFiled(field);
  return (req, res, next) =>{
    if (getFiled(req, field).length > len) {
      next()
    }else {
      res.error(`${filed.join(' ')} must have more than ${len} characters`);
      res.redirect('back')
    }
  }
}