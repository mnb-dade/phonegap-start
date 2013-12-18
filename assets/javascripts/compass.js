var compassWatchID = null;

function compassPageLoaded(){
  startCompassWatch();
}

function startCompassWatch() {
  var options = { frequency: 100 };
  compassWatchID = navigator.compass.watchHeading(onCompassSuccess, onCompassError, options);
}

function stopCompassWatch() {
  if (compassWatchID) {
      navigator.compass.clearWatch(compassWatchID);
      compassWatchID = null;
  }
}

function onCompassSuccess(heading) {
  var output = $('#compass-output');
  output.text('Heading: ' + heading.magneticHeading);
}

function onCompassError(compassError) {
  alert('Compass error: ' + compassError.code);
  stopCompassWatch();
}