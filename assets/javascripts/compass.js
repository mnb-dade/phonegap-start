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
  magneticHeading = heading.magneticHeading;
  console.log(magneticHeading);
  var needle = $('#compass-needle');
  needle.css('-transform', 'rotate(' + magneticHeading + 'deg)');
  needle.css('-webkit-transform', 'rotate(' + magneticHeading + 'deg)');
  needle.css('-ms-transform', 'rotate(' + magneticHeading + 'deg)');
}

function onCompassError(compassError) {
  alert('Compass error: ' + compassError.code);
  stopCompassWatch();
}