var mongoose = require('mongoose');

const timeZone = require('mongoose-timezone');

var KeyVal = mongoose.model('KeyVal', {
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: {
    type: String
  },
  last_edit_timestamp: {
    type: Date,
    default: Date.now
  }
});


module.exports = {KeyVal};
