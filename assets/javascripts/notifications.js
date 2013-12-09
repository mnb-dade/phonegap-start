function showAlert() {
  navigator.notification.alert(
      'You are the winner!',  // message
      'Game Over',            // title
      'Done'                  // buttonName
  );
}

function playBeep() {
  navigator.notification.beep(1);
}

function vibrate() {
  navigator.notification.vibrate(1000);
}
