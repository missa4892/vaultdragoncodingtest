const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/VDCTApp',(err, db) => {
  if (err){
    return console.log("Unable to connect to MongoDB server");
  }
  console.log('Connected to MongoDB server');

  db.collection('KeyVals').findOneAndUpdate({
    key: 'color'
  }, {
    $set: {
      value: 'orange'
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

});
