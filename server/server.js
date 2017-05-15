var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {KeyVal} = require('./models/keyval');

var app = express();

app.use(bodyParser.json());

app.post('/keyvals', (req, res) => {
  console.log(req.body);
  debugger;
  var obj = req.body;
  var keyval;
  for(var key in obj) {
     console.log("Key: " + key + " value: " + obj[key]);
     keyval = new KeyVal({
       key: key,
       value: obj[key]
     });
  }

  keyval.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
  console.log(keyval);
  debugger;
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});
