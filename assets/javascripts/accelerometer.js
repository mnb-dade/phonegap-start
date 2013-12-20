var watchID = null;

function accelerometerPageLoaded(){
  // Update acceleration every 3 seconds
  // var options = { frequency: 100 };
  // watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
  
  window.addEventListener('deviceorientation', function (event) {
    var alpha = event.alpha;
    var beta = event.beta;
    var gamma = event.gamma;
    var plane = $('#plane');
    
    plane.css('-transform', 'rotate(' + -alpha + 'deg)');
    plane.css('-webkit-transform', 'rotate(' + -alpha + 'deg)');
    plane.css('-ms-transform', 'rotate(' + -alpha + 'deg)');
    
    if(beta < 0){
      plane.css('width', 100 + beta + '%');
    }
    
    $('#output').html('Alpha: ' + alpha + '<br />' +
                      'Beta: ' + beta + '<br />' +
                      'Gamma: ' + gamma + '<br />')
  });
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