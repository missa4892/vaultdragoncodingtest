const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/VDCTApp',(err, db) => {
  if (err){
    return console.log("Unable to connect to MongoDB server");
  }
  console.log('Connected to MongoDB server');

  db.collection('KeyVals').insertOne({
    key: 'shape',
    value: 'round'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert keyval', err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2))
  });

  db.collection('KeyVals').insertOne({
    key: 'color',
    value: 'red'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert keyval', err);
    }

    //print timestamp
    console.log(result.ops[0]._id.getTimestamp());

    console.log(JSON.stringify(result.ops, undefined, 2))
  });

  db.close();
});
