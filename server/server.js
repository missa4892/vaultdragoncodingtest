var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');

var {mongoose} = require('./db/mongoose');
var {KeyVal} = require('./models/keyval');
var {formatDate} = require('./helpers/formatDate');

var app = express();
const port = process.env.PORT || 3000;

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

app.get('/keyvals/:mykey', (req, res) => {
  var mykey = req.params.mykey;
  var timestamp = req.query.timestamp;
  var timeFormatted;
  var query   = { 'key': mykey };
  if (timestamp) {
    timeFormatted = moment.unix(timestamp);
    debugger;
    query = {'key': mykey, 'last_edit_timestamp': timeFormatted };
  }
  KeyVal.findOne(query, 'value').then((doc) => {
    if (!doc){
      return res.status(404).send();
    }
    console.log(doc);
    res.send(doc.value);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
