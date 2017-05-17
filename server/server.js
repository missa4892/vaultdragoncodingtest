var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {KeyVal} = require('./models/keyval');
var {formatDate} = require('./helpers/formatDate');

var app = express();

app.use(bodyParser.json());

app.post('/keyvals', (req, res) => {
  var obj = req.body;
  var keyval;
  for(var key in obj) {
     console.log("Key: " + key + " value: " + obj[key]);
     keyval = new KeyVal({
       key: key,
       value: obj[key]
     });
  }

  var query   = { key: keyval.key };
  var update  = { value: keyval.value, last_edit_timestamp: new Date() };
  var options = { new: true };
  KeyVal.findOneAndUpdate(query, update, options).then((doc) => {
    console.log(doc);
    if (doc == null) {
      keyval.save().then((newDoc) => {
          console.log("save " + newDoc);
          res.send(formatDate(newDoc.last_edit_timestamp));
        }, (e) => {
          res.status(400).send(e);
        });
    } else {
      res.send(formatDate(doc.last_edit_timestamp));
    }
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/keyvals', (req, res) => {
  KeyVal.find().then((keyvals) => {
    res.send({keyvals});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
