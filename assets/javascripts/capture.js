function captureAudio() {
  // Launch device audio recording application,
  // allowing user to capture an audio clip
  navigator.device.capture.captureAudio(captureSuccess, captureError, { limit: 1 });
}

// Called when capture operation is finished
//
function captureSuccess(mediaFiles) {
  var i, len;
  for (i = 0, len = mediaFiles.length; i < len; i += 1) {
    displayFile(mediaFiles[i], 'Audio');
  }
}

// Add file name to list
function displayFile(mediaFile, mediaType) {
  var name = mediaFile.name;
  var output = $('#capture-output');
  output.append('<li>' + mediaType + ': ' + name + '</li>');
}

// Called if something bad happens.
//
function captureError(error) {
  var msg = 'An error occurred during capture: ' + error.code;
  navigator.notification.alert(msg, null, 'Uh oh!');
}