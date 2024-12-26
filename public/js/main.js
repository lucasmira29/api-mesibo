/* eslint-disable no-undef */
/* global Mesibo */

// Inicializa a API do Mesibo
var api = new Mesibo();

const params = new URLSearchParams(window.location.search);
const accessToken = params.get('token');
const receiver = params.get('to');

let userToken = '';
let destination = '';

if (accessToken && receiver) {
  userToken = accessToken;
  destination = receiver;

  api.setAccessToken(userToken);
  var listener = new MesiboListener(api);
  api.setListener(listener);
  api.start();

  // Pedir permissão para vídeo e áudio
  navigator.mediaDevices.getUserMedia({ video: true, audio: true });
}


// Função construtora para o listener do Mesibo
function MesiboListener(apiInstance) {
  this.api = apiInstance;
}

// Gerencia o status da conexão
MesiboListener.prototype.Mesibo_onConnectionStatus = function (status) {
  const connectionStatusButton = document.getElementById("cstatus");

  switch (status) {
    case MESIBO_STATUS_CONNECTING:
      connectionStatusButton.classList.remove("btn-danger", "btn-success");
      connectionStatusButton.classList.add("btn-warning");
      connectionStatusButton.innerText = 'Conectando...';
      break;

    case MESIBO_STATUS_ONLINE:
      connectionStatusButton.classList.remove("btn-danger", "btn-warning");
      connectionStatusButton.classList.add("btn-success");
      connectionStatusButton.innerText = 'Você está online';
      break;

    case MESIBO_STATUS_OFFLINE:
    case MESIBO_STATUS_STOPPED:
    case MESIBO_STATUS_CONNECTFAILURE:
    case MESIBO_STATUS_NONETWORK:
    case MESIBO_STATUS_ONPREMISEERROR:
      connectionStatusButton.classList.remove("btn-success", "btn-warning");
      connectionStatusButton.classList.add("btn-danger");
      connectionStatusButton.innerText = "Você está offline";
      break;

    case MESIBO_STATUS_AUTHFAIL:
      connectionStatusButton.classList.remove("btn-success", "btn-warning");
      connectionStatusButton.classList.add("btn-danger");
      connectionStatusButton.innerText = "Desconectado: Token ou ID do aplicativo inválido";
      break;

    case MESIBO_STATUS_SIGNOUT:
      connectionStatusButton.classList.remove("btn-success", "btn-warning");
      connectionStatusButton.classList.add("btn-danger");
      connectionStatusButton.innerText = "Desconectado: Você saiu";
      break;

    default:
      connectionStatusButton.classList.remove("btn-success", "btn-warning");
      connectionStatusButton.classList.add("btn-danger");
      connectionStatusButton.innerText = "Status desconhecido";
      break;
  }
};

// Gerencia chamadas recebidas
MesiboListener.prototype.Mesibo_onCall = function (callId, from, video) {
  console.log("Mesibo_onCall: " + (video) + " chamada de: " + from);

  // Configura os elementos de vídeo para a chamada
  this.api.setupVideoCall("localVideo", "remoteVideo", true);

  const answerBody = document.getElementById("ansBody");
  if (answerBody) {
    answerBody.innerText = "Chamada de vídeo recebida de: " + from;
  }

  // Exibe o modal de chamada recebida
  const answerModal = new bootstrap.Modal(document.getElementById('answerModal'));
  answerModal.show();
};

// Gerencia o status das chamadas
MesiboListener.prototype.Mesibo_onCallStatus = function (callId, status, video) {
  console.log('Status da chamada: ', status);

  const callStatusElement = document.getElementById("vcstatus");
  const callButtonElement = document.getElementById('btn-call');
  const videoMuteButtonElement = document.querySelector('.btn-video-mute');
  const audioMuteButtonElement = document.querySelector('.btn-audio-mute');


  let statusMessage = "";

  // Verifica se a chamada foi finalizada
  if (status === MESIBO_CALLSTATUS_COMPLETE) {
    statusMessage = "Chamada finalizada";
    callButtonElement.classList.remove('visually-hidden');
    videoMuteButtonElement.classList.add('visually-hidden');
    audioMuteButtonElement.classList.add('visually-hidden');

    const answerModal = new bootstrap.Modal(document.getElementById('answerModal'));
    answerModal.hide();
  }

  // Atualiza o status da chamada com base no código recebido
  switch (status) {
    case MESIBO_CALLSTATUS_RINGING:
      statusMessage = "Chamando...";
      break;
    case 48:  // MESIBO__CALLSTATUS_INPROGRESS
      statusMessage = "Em andamento";
      callButtonElement.classList.add('visually-hidden');
      videoMuteButtonElement.classList.remove('visually-hidden');
      audioMuteButtonElement.classList.remove('visually-hidden');
      break;
    case MESIBO_CALLSTATUS_BUSY:
      statusMessage = "Ocupado";
      break;
    case MESIBO_CALLSTATUS_NOANSWER:
      statusMessage = "Sem resposta";
      break;
    case MESIBO_CALLSTATUS_INVALIDDEST:
      statusMessage = "Destino inválido";
      break;
    case MESIBO_CALLSTATUS_UNREACHABLE:
      statusMessage = "Indisponível";
      break;
    case MESIBO_CALLSTATUS_OFFLINE:
      statusMessage = "Offline";
      break;
    case MESIBO_CALLSTATUS_NETWORKERROR:
      statusMessage = "Erro de rede";
      break;
    case MESIBO_CALLSTATUS_RECONNECTING:
      statusMessage = "Reconectando...";
      callButtonElement.classList.add('visually-hidden');
      break;
    case MESIBO_CALLSTATUS_HOLD:
      statusMessage = "Em espera";
      break;
  }

  // Exibe o status da chamada nos elementos correspondentes
  if (callStatusElement) {
    callStatusElement.classList.remove('visually-hidden');
    callStatusElement.innerText = statusMessage;
  }
};

// Função para iniciar uma chamada de vídeo
function video_call() {
  const callStatusElement = document.getElementById("vcstatus");
  callStatusElement.classList.remove('visually-hidden');
  callStatusElement.innerText = "Chamando...";

  api.setupVideoCall("localVideo", "remoteVideo", true);
  api.call(destination);
}

// Alterna o estado de mudo do vídeo
function video_mute_toggle() {
  api.toggleVideoMute();

  const videoIcon = document.getElementById('icon-video');

  if (videoIcon.classList.contains('fa-video')) {
    videoIcon.classList.remove('fa-video');
    videoIcon.classList.add('fa-video-slash');
  } else {
    videoIcon.classList.remove('fa-video-slash');
    videoIcon.classList.add('fa-video');
  }
}

// Alterna o estado de mudo do áudio
function audio_mute_toggle() {
  api.toggleAudioMute();

  const micIcon = document.getElementById('icon-microphone');

  if (micIcon.classList.contains('fa-microphone')) {
    micIcon.classList.remove('fa-microphone');
    micIcon.classList.add('fa-microphone-slash');
  } else {
    micIcon.classList.remove('fa-microphone-slash');
    micIcon.classList.add('fa-microphone');
  }
}

// Encerra a chamada
function hangup() {
  api.hangup();
}

// Atende uma chamada
function answer() {
  const answerModal = new bootstrap.Modal(document.getElementById('answerModal'));
  answerModal.hide();
  api.answer(true);
}
