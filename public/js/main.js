/* global Mesibo */

const inputUser = document.getElementById('input-user');
const inputAppId = document.getElementById('input-appId');
const inputDestination = document.getElementById('input-destination');
const form = document.getElementById('form');

var api = new Mesibo();

let user_token = '';
let appid = '';
let destination = '';


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Obtém o token do usuário
  const token = await getUserToken(inputUser.value, inputAppId.value);

  if (token) {
    user_token = token;
    appid = inputAppId.value;
    // Inicializa a Mesibo
    initializeMesibo(user_token, appid);
  }
});


inputDestination.addEventListener('change', (e) => {
  destination = e.target.value;
});


// obter o token 
async function getUserToken(user, appid) {
  const response = await fetch('/mesibo/generate-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: user, appId: appid }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.token;
  } else {
    console.error('Erro ao buscar o token do usuário');
    return null;
  }
}

// inicializar a API do Mesibo
async function initializeMesibo(userToken, appId) {
  // config da API do Mesibo

  api.setAppName(appId);
  const listener = new MesiboListener(api);
  api.setListener(listener);
  api.setAccessToken(userToken);
  api.start();

  // acessa a câmera e o microfone
  await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
}


function MesiboListener(o) {
  this.api = o;
}

// Gerencia o status da conexão
MesiboListener.prototype.Mesibo_onConnectionStatus = function (status) {
  console.log("Mesibo_onConnectionStatus: " + status);

  var s = document.getElementById("cstatus");
  if (!s) return;

  if (MESIBO_STATUS_ONLINE === status) {
    s.classList.replace("btn-danger", "btn-success");
    s.innerText = "Você está online";
    return;
  }

  s.classList.replace("btn-success", "btn-danger");
  s.innerText = status === MESIBO_STATUS_AUTHFAIL
    ? "Desconectado: Token ou ID do aplicativo inválido"
    : "Você está offline";
};

// Gerencia chamadas recebidas
MesiboListener.prototype.Mesibo_onCall = function (callid, from, video) {
  console.log("Mesibo_onCall: " + (video) + " chamada de: " + from);

  // Configura os elementos de vídeo para a chamada
  this.api.setupVideoCall("localVideo", "remoteVideo", true);

  var s = document.getElementById("ansBody");
  if (s) {
    s.innerText = "Chamada de vídeo recebida de: " + from;
  }

  // Exibe o modal de chamada recebida
  $('#answerModal').modal({ show: true });
};

// Gerencia o status das chamadas
MesiboListener.prototype.Mesibo_onCallStatus = function (callid, status) {
  console.log("Mesibo_onCallStatus: " + status);

  var v = document.getElementById("vcstatus");
  var a = document.getElementById("acstatus");

  var s = "";
  if (status & MESIBO_CALLSTATUS_COMPLETE) {
    s = "Chamada finalizada";
    console.log("Encerrando modal");
    $('#answerModal').modal("hide");
  }

  // Atualiza o status da chamada com base no código recebido
  switch (status) {
    case MESIBO_CALLSTATUS_RINGING:
      s = "Tocando";
      break;
    case MESIBO_CALLSTATUS_ANSWER:
      s = "Atendido";
      break;
    case MESIBO_CALLSTATUS_BUSY:
      s = "Ocupado";
      break;
    case MESIBO_CALLSTATUS_NOANSWER:
      s = "Sem resposta";
      break;
    case MESIBO_CALLSTATUS_INVALIDDEST:
      s = "Destino inválido";
      break;
    case MESIBO_CALLSTATUS_UNREACHABLE:
      s = "Inalcançável";
      break;
    case MESIBO_CALLSTATUS_OFFLINE:
      s = "Offline";
      break;
  }

  // Exibe o status da chamada nos elementos correspondentes
  if (v) v.innerText = "Status da chamada: " + s;
  if (a) a.innerText = "Status da chamada: " + s;
};


// Funções auxiliares para controlar o vídeo e áudio

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
