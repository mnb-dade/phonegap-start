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
  var needle = $('#compass-needle');
  needle.css('-transform', 'rotate(' + heading + 'deg)');
  needle.css('-webkit-transform', 'rotate(' + heading + 'deg)');
  needle.css('-ms-transform', 'rotate(' + heading + 'deg)');
}

function onCompassError(compassError) {
  alert('Compass error: ' + compassError.code);
  stopCompassWatch();
}