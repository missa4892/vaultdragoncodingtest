const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/VDCTApp',(err, db) => {
  if (err){
    return console.log("Unable to connect to MongoDB server");
  }
  console.log('Connected to MongoDB server');

  db.collection('KeyVals').find().toArray().then((docs) => {
    console.log('KeyVals');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch keyvals', err);
  });

  db.collection('KeyVals').find().count().then((count) => {
    console.log(`KeyVals count: ${count}`);
    //console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch keyvals', err);
  });

});
