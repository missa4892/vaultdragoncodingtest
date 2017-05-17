var formatTime = (timeFromDb) => {
  if (timeFromDb != null){
    var timestamp = new Date(timeFromDb);
    var hour = timestamp.getHours().toString();
    var minutes = timestamp.getMinutes().toString();
    var ampmVar = 'am';
    var formatTime;
    if (timestamp.getHours() >= 12){
      ampmVar = 'pm';
      if (timestamp.getHours() > 12){
        hour =  (timestamp.getHours() - 12).toString();
      }
    }
    debugger;
    if (minutes === '00' || minutes === '0'){
      formatTime = hour + ' ' + ampmVar;
    } else {
      formatTime = hour + ':' + minutes + ampmVar;
    }
    return formatTime;
  }
  return '';
};


var formatDate = (timeFromDb) => {
  if (timeFromDb != null){
    var timestamp = new Date(timeFromDb).toISOString().
                        replace(/T/, ' ').      // replace T with a space
                        replace(/\..+/, '');     // delete the dot and everything after
    return timestamp;
  }
  return '';
};

module.exports = {formatTime, formatDate};
