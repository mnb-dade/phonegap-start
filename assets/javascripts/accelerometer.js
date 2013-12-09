var watchID = null;

function accelerometerPageLoaded(){
  // Update acceleration every 3 seconds
  var options = { frequency: 100 };
  watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

function onSuccess(acceleration){
  $('#output').html('Acceleration X: ' + acceleration.x         + '<br />' +
                      'Acceleration Y: ' + acceleration.y         + '<br />' +
                      'Acceleration Z: ' + acceleration.z         + '<br />' +
                      'Timestamp: '      + acceleration.timestamp + '<br /><hr>')
}

function onError(){
  alert('error');
}