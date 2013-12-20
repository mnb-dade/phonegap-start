var watchID = null;

function accelerometerPageLoaded(){
  var options = { frequency: 100 };
  watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}

function onSuccess(acceleration){
  var output = $('#output');
  var plane = $('#plane');
  var x = acceleration.x;
  var y = acceleration.y;
  var z = acceleration.z;
  var x_rotation = -(x * 10);
  
  output.html('Acceleration X: ' + acceleration.x         + '<br />' +
              'Acceleration Y: ' + acceleration.y         + '<br />' +
              'Acceleration Z: ' + acceleration.z         + '<br />' +
              'Timestamp: '      + acceleration.timestamp + '<br />');
                    
  plane.css('-transform', 'rotate(' + x_rotation + 'deg)');
  plane.css('-webkit-transform', 'rotate(' + x_rotation + 'deg)');
  plane.css('-ms-transform', 'rotate(' + x_rotation + 'deg)');
  
  if(z <= 3.9){
    plane.css('width', '100%');
  }
  else if (z > 3.9 && z < 6.9) {
    plane.css('width', 100 - (z * 10) + '%');
  }
  else if (z >= 6.9){
    plane.css('width', '30%');
  }
}

function onError(){
  alert('error');
}