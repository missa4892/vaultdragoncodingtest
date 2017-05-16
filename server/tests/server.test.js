const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {KeyVal} = require('./../models/keyval');

//before running the test, clear the collection
beforeEach((done) => {
  debugger;
  KeyVal.remove({}).then(() => (done));
});

describe('POST /keyvals', () => {

   it ('should create a new keyval', (done) => {

    var key = 'Test a key';

    request(app)
      .post('/keyvals')
      .send({key})
      .expect(200)
      .expect((res) => {
        var keyStr, valStr;
        var obj = res.body;
        console.log("[SERVER TEST] obj: " + obj);
        for(var keyI in obj) {
          console.log("[SERVER TEST] Key: " + keyI + " Value: " + obj[keyI]);
          if(keyI == 'key')
            keyStr = keyI;
          if(keyI == 'value')
            valStr = obj[keyI];
        }

        expect(valStr).toBe(key);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        KeyVal.find().then((keyvals) => {
          expect(keyvals.length).toBe(1);
          expect(keyvals[0].value).toBe(key);
          done();
        }).catch((err) => done(err));
      });
   });
  //
  // it ('should not create keyval with invalid body data', (done) => {
  //   request(app)
  //     .post('/keyvals')
  //     .send({}) //empty req
  //     .expect(400)
  //     .end((err, res) => {
  //       if (err) {
  //         return done(err);
  //       }
  //
  //       KeyVal.find().then((keyvals) => {
  //         expect(keyvals.length).toBe(0);
  //         done();
  //       }).catch((err) => done(err));
  //     });
  // });

});
