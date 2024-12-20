/* global Mesibo */

var btnUser1 = document.getElementById('user-1');
var btnUser2 = document.getElementById('user-2');

btnUser2.addEventListener('click', () => {
  user_token = '7f33bf862cf040907967f35e66fef490975c549126eacedd4bbd28qa55eab39b13';

  destination = 'usuario1@email.com';


  api.setAppName(appid);
  var listener = new MesiboListener(api);
  api.setListener(listener);
  api.setAccessToken(user_token);
  api.start();
});

btnUser1.addEventListener('click', () => {
  user_token = '31dfd06912f942543e797678ddd2b459d15496dedf10a4615e554bbd06paf9b1d95ea5';

  destination = 'usuario2@email.com';


  api.setAppName(appid);
  var listener = new MesiboListener(api);
  api.setListener(listener);
  api.setAccessToken(user_token);
  api.start();
});

var user_token = '';

var appid = 'com.exemploteste';

var destination = '5547997851233';

function MesiboListener(o) {
  this.api = o;
}

MesiboListener.prototype.Mesibo_onConnectionStatus = function (status) {
  console.log("Mesibo_onConnectionStatus: " + status);

  var s = document.getElementById("cstatus");
  if (!s) {
    return;
  };

  if (MESIBO_STATUS_ONLINE === status) {
    s.classList.replace("btn-danger", "btn-success");
    s.innerText = "You are online";
    return;
  }

  s.classList.replace("btn-success", "btn-danger");
  s.innerText = status === MESIBO_STATUS_AUTHFAIL
    ? "Disconnected: Bad Token or App ID"
    : "You are offline";
};


MesiboListener.prototype.Mesibo_onCall = function (callid, from, video) {
  console.log("Mesibo_onCall: " + (video) + " call from: " + from);

  this.api.setupVideoCall("localVideo", "remoteVideo", true);

  var s = document.getElementById("ansBody");
  if (s) { s.innerText = "Incoming Video " + " call from: " + from; }

  $('#answerModal').modal({ show: true });
};


MesiboListener.prototype.Mesibo_onCallStatus = function (callid, status) {
  console.log("Mesibo_onCallStatus: " + status);
  var v = document.getElementById("vcstatus");
  var a = document.getElementById("acstatus");

  var s = "";
  if (status & MESIBO_CALLSTATUS_COMPLETE) {
    s = "Complete";
    console.log("closing");
    $('#answerModal').modal("hide");
  }

  switch (status) {
    case MESIBO_CALLSTATUS_RINGING:
      s = "Ringing";
      break;

    case MESIBO_CALLSTATUS_ANSWER:
      s = "Answered";
      break;

    case MESIBO_CALLSTATUS_BUSY:
      s = "Busy";
      break;

    case MESIBO_CALLSTATUS_NOANSWER:
      s = "No Answer";
      break;

    case MESIBO_CALLSTATUS_INVALIDDEST:
      s = "Invalid Destination";
      break;

    case MESIBO_CALLSTATUS_UNREACHABLE:
      s = "Unreachable";
      break;

    case MESIBO_CALLSTATUS_OFFLINE:
      s = "Offline";
      break;
  }
  if (v)
    v.innerText = "Call Status: " + s;

  if (a)
    a.innerText = "Call Status: " + s;
};


var api = new Mesibo();
// api.setAppName(appid);
// var listener = new MesiboListener(api);
// api.setListener(listener);
// api.setAccessToken(user_token);
// api.start();


function video_call() {
  api.setupVideoCall("localVideo", "remoteVideo", true);
  api.call(destination);
}

function video_mute_toggle() {
  api.toggleVideoMute();
}

function audio_mute_toggle() {
  api.toggleAudioMute();
}

function hangup() {
  api.hangup();
}

function answer() {
  $('#answerModal').modal("hide");
  api.answer(true);
}
